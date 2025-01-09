import { blogType } from '../DB/DB.types';
import blogsRepository from '../repositories/blogsRepository';

const blogsService = {
  async getBlogs() {
    const blogs = await blogsRepository.getBlogs();
    if (!blogs) {
      console.error('Service error: get blogs in DB:', blogs);
      throw new Error('Blogs not found');
    }
    return blogs;
  },
  async getBlog(id: string) {
    const blog = await blogsRepository.getBlog(id);
    if (!blog) {
      console.error('Service error: get blog from DB:', blog);
      throw new Error('Blog not found');
    }
    return blog;
  },
  async createBlog(blog: blogType) {
    return await blogsRepository.create(blog);
  },
  async changeBlog(
    id: string,
    name: string,
    description: string,
    websiteUrl: string
  ) {
    return await blogsRepository.change(id, name, description, websiteUrl);
  },
  async deleteBlog(id: string) {
    const deletedBlog = await blogsRepository.delete(id);
    if (!deletedBlog) {
      console.error('Service error: delete blog in DB:', deletedBlog);
      throw new Error('Blog not found');
    }
    return deletedBlog;
  },
};

export default blogsService;
