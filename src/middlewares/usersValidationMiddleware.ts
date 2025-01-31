import { body } from 'express-validator';

const usersValidationMiddleware = [
  body('login')
    .isString()
    .trim()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Login can only contain letters, numbers, "_" and "-"')
    .isLength({ min: 3, max: 10 })
    .withMessage('The login length must be between 3 and 10 characters.'),

  body('email')
    .isString()
    .trim()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage('Bad email'),

  body('password')
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('The password length must be between 6 and 20 characters.'),
];
export default usersValidationMiddleware;
