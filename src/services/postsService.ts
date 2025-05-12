import { PostsLikes } from '../models';
import { IPost } from '../models/PostModel';
import blogsRepository from '../repositories/commands/blogsRepository';
import likesRepository from '../repositories/commands/likesRepository';
import postsRepository from '../repositories/commands/postsRepository';
import userRepository from '../repositories/commands/usersRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';
import ApiError from '../utils/handlers/ApiError';

interface NewestLike {
  userId: string;
  login: string;
  addedAt: string;
  status: 'Like' | 'Dislike';
}

interface UpdatedLikesInfo {
  likesCount: number;
  dislikesCount: number;
  newestLikes: NewestLike[];
}

const postsService = {
  async getPosts() {
    try {
      const posts = await postsRepository.getPosts();
      if (!posts || posts.length === 0) {
        throw new Error('No posts found');
      }
      return posts;
    } catch (error) {
      console.error('Service error: Failed to fetch posts:', error);
      throw new Error('Could not retrieve posts');
    }
  },
  async createPost(
    post: Omit<IPost, 'id' | 'createdAt' | 'updatedAt' | 'blogName'>
  ): Promise<IPost> {
    try {
      const blog = await blogsRepository.getBlog(post.blogId);
      if (!blog) {
        throw new Error(`Blog with ID ${post.blogId} not found`);
      }

      const newPost = await postsRepository.create({
        ...post,
        blogId: post.blogId,
        blogName: blog.name,
      });

      return newPost;
    } catch (error) {
      console.error('Service error: Failed to create post:', error);
      throw new Error('Could not create post');
    }
  },
  async getPost(id: string) {
    if (!id) {
      throw new Error('Post ID must be provided');
    }

    const post = await postsRepository.getPost(id);

    if (!post) {
      throw ApiError.notFound(`Post with ID ${id} not found`);
    }
    return post;
  },
  async deletePost(id: string) {
    if (!id) {
      throw new Error('Post ID must be provided');
    }

    try {
      const deletedPost = await postsRepository.delete(id);
      if (!deletedPost) {
        throw ApiError.notFound(`Post with ID ${id} not found`);
      }
      return deletedPost;
    } catch (error) {
      console.error(
        `Service error: Failed to delete post with ID ${id}:`,
        error
      );
      throw new Error('Could not delete post');
    }
  },
  async changePost(post: Omit<IPost, 'createdAt' | 'updatedAt'>) {
    // try {
    //   const updatedPost = await postsRepository.change(post);
    //   if (!updatedPost) {
    //     throw new Error(`Post with ID ${post.id} not found`);
    //   }
    //   return updatedPost;
    // } catch (error: any) {
    //   console.error(
    //     `Service error: Failed to update post with ID ${post.id}:`,
    //     error
    //   );
    //   throw new Error('Could not update post');
    // }
    return await postsRepository.change(post);
  },
  async updateLikeStatus(
    postId: string,
    likeStatus: 'Like' | 'Dislike' | 'None',
    userId: string
  ) {
    const post = await postsRepository.getPostById(postId);
    const user = await userRepository.getUserById(userId);

    if (!user) throw ApiError.notFound('User not found');
    if (!post) throw ApiError.notFound('Post not found');

    const info = post.extendedLikesInfo;

    if (likeStatus === 'Dislike') {
      if (info.newestLikes.find((like) => like.userId !== userId)) {
        info.dislikesCount++;
      }
    }

    // роверить наличие лайка дизлайка, и менять либо не менть

    // const newestLikes: NewestLike[] = Array.isArray(info.newestLikes)
    //   ? (info.newestLikes as NewestLike[])
    //   : [];

    // const oldLike = newestLikes.find((like) => like.userId === userId);

    // let filteredLikes = newestLikes.filter((like) => like.userId !== userId);

    // let likesCount: number = info.likesCount ?? 0;
    // let dislikesCount: number = info.dislikesCount ?? 0;

    // if (oldLike) {
    //   if (oldLike.status === 'Like') likesCount--;
    //   if (oldLike.status === 'Dislike') dislikesCount--;
    // }

    // if (likeStatus !== 'None') {
    //   const newLike: NewestLike = {
    //     userId,
    //     login: user.login,
    //     addedAt: new Date().toISOString(),
    //     status: likeStatus,
    //   };

    //   filteredLikes.unshift(newLike);

    //   if (likeStatus === 'Like') likesCount++;
    //   if (likeStatus === 'Dislike') dislikesCount++;
    // }

    // const top3NewestLikes = filteredLikes
    //   .filter((like) => like.status === 'Like')
    //   .slice(0, 3);

    // const updatedLikesInfo: UpdatedLikesInfo = {
    //   likesCount,
    //   dislikesCount,
    //   newestLikes: top3NewestLikes,
    // };

    // await postsRepository.changeStatusLike(postId, updatedLikesInfo);
  },
};
export default postsService;
