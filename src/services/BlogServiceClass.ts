import { inject, injectable } from 'inversify';
import { BlogRepository } from '../repositories/commands/BlogRepositoryClass';
import { BlogDocument, IBlog } from '../models/BlogModel';

@injectable()
export class BlogService {
  constructor(
    @inject(BlogRepository)
    private blogRepository: BlogRepository
  ) {}

  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ): Promise<IBlog> {
    try {
      return await this.blogRepository.createBlog(blog);
    } catch (error) {
      console.error('Service error while creating blog:', error);
      throw new Error('Failed to create blog');
    }
  }

  async getBlog(id: string) {
    try {
      const blog = await this.blogRepository.getBlog(id);

      if (!blog) {
        throw new Error(`Blog with ID ${id} not found`);
      }

      return blog;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  }

  async createPostForBlog(postValue: {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
  }) {
    try {
      const blog = await this.getBlog(postValue.blogId);
      if (!blog) {
        throw new Error(`Blog with id ${postValue.blogId} not found`);
      }

      const newPost = await this.blogRepository.createPostForBlog({
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
  }
}
