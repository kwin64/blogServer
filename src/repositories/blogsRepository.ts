import DB from '../DB/DB';
import { blogType } from '../DB/DB.types';
import { Blog } from '../models';

const blogsRepository = {
  async getBlogs() {
    return Blog.find().lean<blogType[]>();
  },
  async create(blog: blogType) {
    const newBlog = new Blog({
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    });
    return newBlog.save();
  },
  async getBlog(id: string): Promise<blogType | null> {
    const foundedBlog = await DB.blogs.find((blog) => blog.id === id);
    if (foundedBlog) {
      return foundedBlog;
    } else {
      return null;
    }
  },
  async change(blog: blogType): Promise<blogType | null> {
    let foundedBlog: blogType | undefined = DB.blogs.find(
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
