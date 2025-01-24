import { mapBlogDocumentToBlogType } from '../../mappers/mapBlogDocumentToBlogType';
import { Blog } from '../../models';
import { BlogDocument, IBlog } from '../../models/BlogModel';
import postsRepository from './postsRepository';

const blogsRepository = {
  async getBlogs(): Promise<IBlog[]> {
    try {
      const blogs = await Blog.find().lean<IBlog[]>();
      return blogs.map((blog) =>
        mapBlogDocumentToBlogType(blog as BlogDocument)
      );
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while fetching blogs');
    }
  },
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
  },
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
  },
  async getBlog(id: string): Promise<IBlog | null> {
    try {
      const blog = await Blog.findOne({ _id: id }).lean<IBlog>();
      return blog ? mapBlogDocumentToBlogType(blog as BlogDocument) : null;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while fetching blog');
    }
  },
  async change(
    blog: Omit<IBlog, 'createdAt' | 'updatedAt' | 'isMembership'>
  ): Promise<IBlog | null> {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(
        blog.id,
        {
          name: blog.name,
          description: blog.description,
          websiteUrl: blog.websiteUrl,
        },
        { new: true }
      ).lean<IBlog>();

      if (!updatedBlog) return null;

      return mapBlogDocumentToBlogType(updatedBlog as BlogDocument);
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while updating blog');
    }
  },
  async delete(id: string) {
    try {
      const result = await Blog.findByIdAndDelete(id);
      if (!result) {
        return null;
      }
      return true;
    } catch (error) {
      console.error('Database error:', error);
      throw new Error('Database error while deleting blog');
    }
  },
};

export default blogsRepository;
