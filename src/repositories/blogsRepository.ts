import { mapBlogDocumentToBlogType } from '../mappers/mapBlogDocumentToBlogType';
import { Blog } from '../models';
import { BlogDocument, IBlog } from '../models/BlogModel';

const blogsRepository = {
  async getBlogs(): Promise<IBlog[]> {
    const blogs = await Blog.find().lean<IBlog[]>();
    return blogs.map((blog) => mapBlogDocumentToBlogType(blog as BlogDocument));
  },
  async create(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
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
    const blog = await Blog.findOne({ _id: id }).lean<IBlog>();
    return mapBlogDocumentToBlogType(blog as BlogDocument);
  },
  async change(
    blog: Omit<IBlog, 'createdAt' | 'updatedAt' | 'isMembership'>
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

    if (!updatedBlog) return null;

    return mapBlogDocumentToBlogType(updatedBlog as BlogDocument);
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
