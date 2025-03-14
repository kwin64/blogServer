import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import usersValidationMiddleware from '../middlewares/usersValidationMiddleware';
import checkRefreshToken from '../middlewares/checkRefreshToken';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware';

const authRouter = Router({});
authRouter.post('/login', rateLimitMiddleware, authController.login);
authRouter.get('/me', authMiddlewareJWT, authController.authMe);
authRouter.post(
  '/registration',
  rateLimitMiddleware,
  usersValidationMiddleware,
  errorsMiddleware,
  authController.registration
);
authRouter.post(
  '/registration-confirmation/',
  rateLimitMiddleware,
  authController.confirmationEmail
);
authRouter.post(
  '/registration-email-resending',
  rateLimitMiddleware,
  authController.resendConfirmationEmail
);
authRouter.post('/logout', checkRefreshToken, authController.logout);
authRouter.post(
  '/refresh-token',
  checkRefreshToken,
  authController.refreshToken
);

export default authRouter;
