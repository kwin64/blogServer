import { body } from 'express-validator';

const commentsValidationMiddleware = [
  body('content')
    .isString()
    .trim()
    .isLength({ min: 20, max: 300 })
    .withMessage('The content length must be between 20 and 300 characters.'),
];
export default commentsValidationMiddleware;
