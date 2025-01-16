import DB from '../DB/DB';
import { mapBlogDocumentToBlogType } from '../mappers/mapBlogDocumentToBlogType';
import { Blog } from '../models';
import { IBlog } from '../models/BlogModel';
import { BlogsServiceinputDataType } from '../services/types';

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
    let foundedBlog: IBlog | undefined = DB.blogs.find(
      (item) => item.id === blog.id
    );
    if (foundedBlog) {
      foundedBlog.name = blog.name;
      foundedBlog.description = blog.description;
      foundedBlog.websiteUrl = blog.websiteUrl;
      return foundedBlog;
    } else {
      return null;
    }
  },
  async delete(id: string) {
    const index = await DB.blogs.findIndex((blog) => blog.id === id);
    if (index === -1) {
      return null;
    }
    return DB.blogs.splice(index, 1);
  },
};

export default blogsRepository;
