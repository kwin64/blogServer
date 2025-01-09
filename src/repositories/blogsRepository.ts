import DB from '../DB/DB';
import { blogType } from '../DB/DB.types';
import getRandomId from '../utils/getRandomId';

const blogsRepository = {
  async getBlogs(): Promise<blogType[]> {
    try {
      const allBlogs = await DB.blogs;
      return allBlogs;
    } catch (error) {
      console.error('Error get blogs with DB:', error);
      throw new Error('Database: get blogs failed');
    }
  },
  async create(blog: blogType): Promise<blogType> {
    try {
      DB.blogs.push(blog);
      return blog;
    } catch (error) {
      console.error('Error set blog in DB:', error);
      throw new Error('Database: set blog failed');
    }
  },
  async getBlog(id: string): Promise<blogType | null> {
    try {
      const foundedBlog = await DB.blogs.find((blog) => blog.id === id);
      if (foundedBlog) {
        return foundedBlog;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error get blog with DB:', error);
      throw new Error('Database: get blog failed');
    }
  },
  async change(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<blogType | null> {
    try {
      const blog: blogType | undefined = DB.blogs.find(
        (blog) => blog.id === id
      );
      if (blog) {
        blog.name = name;
        blog.description = description;
        blog.websiteUrl = websiteUrl;
        return blog;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error change blog in DB:', error);
      throw new Error('Database: change blog failed');
    }
  },
  async delete(id: string) {
    try {
      const index = await DB.blogs.findIndex((blog) => blog.id === id);
      if (index === -1) {
        return null;
      }
      return DB.blogs.splice(index, 1);
    } catch (error) {
      console.error('Error delete blog with DB:', error);
      throw new Error('Database: delete blog failed');
    }
  },
};

export default blogsRepository;
