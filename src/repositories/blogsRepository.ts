import DB from '../DB/DB';
import { postType } from '../DB/DB.types';

export const blogsRepository = {
  async getBlogs(): Promise<postType[]> {
    const allBlogs = await DB.blogs;
    return allBlogs;
  },
  async create() {},
  async getBlog(id: string) {},
  async change(id: string) {},
  async delete(id: string) {},
};
