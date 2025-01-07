import { blogsRepository } from '../repositories/blogsRepository';

export const blogsService = {
  async getBlogs() {
    const video = await blogsRepository.getBlogs();
    if (!video) {
      throw new Error('Video not found');
    }
    return video;
  },

  async createBlog(name: string, description: string, websiteUrl: string) {
    return await blogsRepository.create(name, description, websiteUrl);
  },
};
