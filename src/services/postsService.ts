import { IPost } from '../models/PostModel';
import blogsRepository from '../repositories/commands/blogsRepository';
import postsRepository from '../repositories/commands/postsRepository';

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
  ) {
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

    try {
      const post = await postsRepository.getPost(id);
      if (!post) {
        throw new Error(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      console.error(
        `Service error: Failed to fetch post with ID ${id}:`,
        error
      );
      throw new Error('Could not retrieve post');
    }
  },
  async deletePost(id: string) {
    if (!id) {
      throw new Error('Post ID must be provided');
    }

    try {
      const deletedPost = await postsRepository.delete(id);
      if (!deletedPost) {
        throw new Error(`Post with ID ${id} not found`);
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
    if (!post.id) {
      throw new Error('Post ID must be provided');
    }

    try {
      const updatedPost = await postsRepository.change(post);
      if (!updatedPost) {
        throw new Error(`Post with ID ${post.id} not found`);
      }
      return updatedPost;
    } catch (error) {
      console.error(
        `Service error: Failed to update post with ID ${post.id}:`,
        error
      );
      throw new Error('Could not update post');
    }
  },
};
export default postsService;
