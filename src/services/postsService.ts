import { IPost } from '../models/PostModel';
import blogsRepository from '../repositories/commands/blogsRepository';
import postsRepository from '../repositories/commands/postsRepository';
import ApiError from '../utils/handlers/ApiError';

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

    console.log('id', id);

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
};
export default postsService;
