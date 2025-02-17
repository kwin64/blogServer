import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import usersValidationMiddleware from '../middlewares/usersValidationMiddleware';

const authRouter = Router({});
authRouter.post('/login', authController.login);
authRouter.get('/me', authMiddlewareJWT, authController.authMe);
authRouter.post(
  '/registration',
  usersValidationMiddleware,
  errorsMiddleware,
  authController.registration
);
authRouter.post('/registration-confirmation/', authController.verifyEmail)
authRouter.post('/registration-email-resending', authController.authMe);

export default authRouter;
