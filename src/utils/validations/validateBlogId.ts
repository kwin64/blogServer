import { CustomValidator } from 'express-validator';
import blogsRepository from '../../repositories/blogsRepository';

export const validateBlogId: CustomValidator = async (blogId, { req }) => {
  const foundedBlog = await blogsRepository.getBlog(blogId);
  if (!foundedBlog) {
    throw new Error('The provided blogId does not exist');
  }
  req.body.blogName = foundedBlog.name;
};
