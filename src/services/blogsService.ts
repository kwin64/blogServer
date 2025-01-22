import { IBlog } from '../models/BlogModel';
import blogsRepository from '../repositories/commands/blogsRepository';
import postsRepository from '../repositories/commands/postsRepository';

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
  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ) {
    return await blogsRepository.create(blog);
  },
  async changeBlog(
    blog: Omit<IBlog, 'createdAt' | 'updatedAt' | 'isMembership'>
  ) {
    return await blogsRepository.change(blog);
  },
  async deleteBlog(id: string) {
    const deletedBlog = await blogsRepository.delete(id);
    await postsRepository.deletePostsByBlogId(id);
    if (!deletedBlog) {
      console.error('Service error: delete blog in DB:', deletedBlog);
      throw new Error('Blog not found');
    }
    return deletedBlog;
  },
};

export default blogsService;
