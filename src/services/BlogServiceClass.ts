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
}
