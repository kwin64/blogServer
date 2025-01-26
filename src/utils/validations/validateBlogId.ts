import { CustomValidator } from 'express-validator';
import blogsRepository from '../../repositories/commands/blogsRepository';

export const validateBlogId: CustomValidator = async (blogId, { req }) => {
  const foundedBlog = await blogsRepository.getBlog(blogId);

  if (!foundedBlog) {
    console.error('Blog not found:', blogId);
    throw new Error('The provided blogId does not exist');
  }
  req.body.blogName = foundedBlog.name;
};
