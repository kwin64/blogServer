import { body } from 'express-validator';

const recoveryPasswordValidationEmail = [
  body('email')
    .isString()
    .trim()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .withMessage('Bad email'),
];
export default recoveryPasswordValidationEmail;
