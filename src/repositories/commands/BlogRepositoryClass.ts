import { mapBlogDocumentToBlogType } from '../../mappers/mapBlogDocumentToBlogType';
import Blog, { BlogDocument, IBlog } from '../../models/BlogModel';
import { injectable } from 'inversify';

@injectable()
export class BlogRepository {
  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ): Promise<IBlog> {
    try {
      const newBlog = new Blog({
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
      });
      return mapBlogDocumentToBlogType(newBlog);
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while creating blog');
    }
  }
}
