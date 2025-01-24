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
    try {
      const blog = await blogsRepository.getBlog(id);

      if (!blog) {
        throw new Error(`Blog with ID ${id} not found`);
      }

      return blog;
    } catch (error) {
      console.error('Service error:', error);
      throw error;
    }
  },
  async createBlog(
    blog: Omit<IBlog, 'id' | 'createdAt' | 'updatedAt' | 'isMembership'>
  ) {
    return await blogsRepository.create(blog);
  },
  async createPostForBlog(postValue: {
    title: string;
    shortDescription: string;
    content: string;
    blogId: string;
  }) {
    const blog = await blogsService.getBlog(postValue.blogId);
    if (!blog) {
      throw new Error(`Blog with id ${postValue.blogId} not found`);
    }

    const post = await blogsRepository.createPostForBlog({
      ...postValue,
      blogName: blog.name,
    });
    return await blogsRepository.createPostForBlog(post);
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
