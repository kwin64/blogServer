import { mapBlogDocumentToBlogType } from '../../mappers/mapBlogDocumentToBlogType';
import Blog, { BlogDocument, IBlog } from '../../models/BlogModel';
import { injectable } from 'inversify';
import postsRepository from './postsRepository';

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

  async getBlog(id: string): Promise<IBlog | null> {
    try {
      const blog = await Blog.findOne({ _id: id }).lean<IBlog>();
      return blog ? mapBlogDocumentToBlogType(blog as BlogDocument) : null;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while fetching blog');
    }
  }

  async create(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ): Promise<IBlog> {
    try {
      const newBlog = new Blog({
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
      });
      const savedBlog = await newBlog.save();
      return mapBlogDocumentToBlogType(savedBlog);
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while creating blog');
    }
  }

  async createPostForBlog(postValue: {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
    blogName: string;
  }) {
    try {
      const newPost = await postsRepository.create(postValue);
      return newPost;
    } catch (error) {
      console.error('Error creating post for blog:', error);
      throw new Error('Database error while creating post for blog');
    }
  }
}
