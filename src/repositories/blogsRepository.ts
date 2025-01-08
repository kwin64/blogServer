import DB from '../DB/DB';
import { blogType } from '../DB/DB.types';
import getRandomId from '../utils/getRandomId';

export const blogsRepository = {
  async getBlogs(): Promise<blogType[]> {
    try {
      const allBlogs = await DB.blogs;
      return allBlogs;
    } catch (error) {
      console.error('Error get blogs with DB:', error);
      throw new Error('Database: get blogs failed');
    }
  },
  async create(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<blogType> {
    const newBlog: blogType = {
      id: getRandomId(Date.now()),
      name,
      description,
      websiteUrl,
    };
    try {
      DB.blogs.push(newBlog);
      return newBlog;
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
  async change(id: string) {},
  async delete(id: string) {
    try {
      const index = await DB.blogs.findIndex((blog) => blog.id === id);
      if (index === -1) {
        return null;
      }
      const deletedBlog = DB.blogs.splice(index, 1);
      return deletedBlog;
    } catch (error) {
      console.error('Error delete blog with DB:', error);
      throw new Error('Database: delete blog failed');
    }
  },
};
