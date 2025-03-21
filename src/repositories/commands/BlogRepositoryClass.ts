import Blog, { BlogDocument, IBlog } from '../../models/BlogModel';
import { injectable } from 'inversify';

@injectable()
export class BlogRepository {
  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ): Promise<BlogDocument> {
    try {
      const newBlog = new Blog({
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
      });
      return await newBlog.save();
      // return mapBlogDocumentToBlogType(savedBlog);
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while creating blog');
    }
  }
}
