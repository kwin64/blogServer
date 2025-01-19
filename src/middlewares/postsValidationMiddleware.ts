import { body } from 'express-validator';
import blogsRepository from '../repositories/blogsRepository';
import { validateBlogId } from '../utils/validations/validateBlogId';

const postsValidationMiddleware = [
  body('title')
    .isString()
    .trim()
    .withMessage('title must be a string')
    .isLength({ min: 1, max: 30 })
    .withMessage('The title length must be between 1 and 30 characters.'),
  body('shortDescription')
    .isString()
    .trim()
    .withMessage('shortDescription must be a string')
    .isLength({ min: 1, max: 100 })
    .withMessage(
      'The shortDescription length must be between 1 and 100 characters.'
    ),
  body('content')
    .isString()
    .trim()
    .withMessage('content must be a string')
    .isLength({ min: 1, max: 1000 })
    .withMessage('The content length must be between 1 and 1000 characters.'),
  body('blogId').custom(validateBlogId),
];
export default postsValidationMiddleware;
