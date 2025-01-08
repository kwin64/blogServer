import { blogsRepository } from '../repositories/blogsRepository';

const blogsService = {
  async getBlogs() {
    const blogs = await blogsRepository.getBlogs();
    if (!blogs) {
      console.error('Service error: set blog in DB:', blogs);
      throw new Error('Blog not found');
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
  async createBlog(name: string, description: string, websiteUrl: string) {
    return await blogsRepository.create(name, description, websiteUrl);
  },
};

export default blogsService;
