import { mapBlogDocumentToBlogType } from '../mappers/mapBlogDocumentToBlogType';
import { Blog } from '../models';
import { IBlog } from '../models/BlogModel';

const blogsRepository = {
  async getBlogs(): Promise<IBlog[]> {
    return Blog.find().lean<IBlog[]>();
  },
  async create(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<IBlog> {
    const newBlog = new Blog({
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    });
    const savedBlog = await newBlog.save();
    return mapBlogDocumentToBlogType(savedBlog);
  },
  async getBlog(id: string): Promise<IBlog | null> {
    return await Blog.findOne({ _id: id }).lean<IBlog>();
  },
  async change(
    blog: Omit<IBlog, 'createdAt' | 'updatedAt'>
  ): Promise<IBlog | null> {
    const updatedBlog = await Blog.findByIdAndUpdate(
      blog.id,
      {
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
      },
      {
        new: true,
      }
    ).lean<IBlog>();

    return updatedBlog || null;
  },
  async delete(id: string) {
    const result = await Blog.findByIdAndDelete(id);
    if (!result) {
      return null;
    }
    return true;
  },
};

export default blogsRepository;
