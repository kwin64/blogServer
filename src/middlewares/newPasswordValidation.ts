import { body } from 'express-validator';

const newPasswordValidation = [
  body('password')
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('The password length must be between 6 and 20 characters.'),
];
export default newPasswordValidation;
