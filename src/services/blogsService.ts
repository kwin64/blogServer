import { IBlog } from '../models/BlogModel';
import blogsRepository from '../repositories/commands/blogsRepository';
import postsRepository from '../repositories/commands/postsRepository';

const blogsService = {
  async getBlogs() {
    try {
      const blogs = await blogsRepository.getBlogs();
      if (!blogs || blogs.length === 0) {
        throw new Error('No blogs found in the database');
      }
      return blogs;
    } catch (error) {
      console.error('Service error while fetching blogs:', error);
      throw new Error('Failed to fetch blogs');
    }
  },
  async getBlog(id: string) {
    try {
      const blog = await blogsRepository.getBlog(id);

      if (!blog) {
        throw new Error(`Blog with ID ${id} not found`);
      }

      return blog;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },
  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ) {
    try {
      const newBlog = await blogsRepository.create(blog);
      return newBlog;
    } catch (error) {
      console.error('Service error while creating blog:', error);
      throw new Error('Failed to create blog');
    }
  },
  async createPostForBlog(postValue: {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
  }) {
    try {
      const blog = await blogsService.getBlog(postValue.blogId);
      if (!blog) {
        throw new Error(`Blog with id ${postValue.blogId} not found`);
      }

      const newPost = await blogsRepository.createPostForBlog({
        ...postValue,
        blogName: blog.name,
      });

      return newPost;
    } catch (error) {
      console.error(
        `Service error while creating post for blog with ID ${postValue.blogId}:`,
        error
      );
      throw new Error('Failed to create post for blog');
    }
  },
  async changeBlog(
    blog: Omit<IBlog, 'createdAt' | 'updatedAt' | 'isMembership'>
  ) {
    try {
      const updatedBlog = await blogsRepository.change(blog);
      if (!updatedBlog) {
        throw new Error(`Blog with ID ${blog.id} not found`);
      }
      return updatedBlog;
    } catch (error) {
      console.error(
        `Service error while updating blog with ID ${blog.id}:`,
        error
      );
      throw new Error('Failed to update blog');
    }
  },
  async deleteBlog(id: string) {
    try {
      const deletedBlog = await blogsRepository.delete(id);
      if (!deletedBlog) {
        throw new Error(`Blog with ID ${id} not found`);
      }

      await postsRepository.deletePostsByBlogId(id);
      return true;
    } catch (error) {
      console.error(`Service error while deleting blog with ID ${id}:`, error);
      throw new Error('Failed to delete blog');
    }
  },
};

export default blogsService;
