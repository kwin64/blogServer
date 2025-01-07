import DB from '../DB/DB';
import { blogType } from '../DB/DB.types';
import getRandomId from '../utils/getRandomId';

export const blogsRepository = {
  async getBlogs(): Promise<blogType[]> {
    const allBlogs = await DB.blogs;
    return allBlogs;
  },
  async create(
    name: string,
    description: string,
    websiteUrl: string
  ): Promise<blogType> {
    const newBlog = {
      id: getRandomId(Date.now()),
      name,
      description,
      websiteUrl,
    };
    DB.blogs = [...DB.blogs, newBlog];
    return newBlog;
  },
  async getBlog(id: string) {},
  async change(id: string) {},
  async delete(id: string) {},
};
