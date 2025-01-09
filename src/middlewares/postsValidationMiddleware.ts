import { body } from 'express-validator';

const postsValidationMiddleware = [
  body('name')
    .isString()
    .trim()
    .withMessage('Name must be a string')
    .isLength({ min: 1, max: 15 })
    .withMessage('The name length must be between 1 and 15 characters.'),
  body('description')
    .isString()
    .trim()
    .withMessage('Description must be a string')
    .isLength({ min: 1, max: 500 })
    .withMessage('The name length must be between 1 and 500 characters.'),
  body('websiteUrl')
    .isURL()
    .trim()
    .withMessage('Website URL must be a valid URL')
    .isLength({ min: 1, max: 100 })
    .withMessage('The name length must be between 1 and 100 characters.'),
];
export default postsValidationMiddleware;
