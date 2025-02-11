import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';

const authRouter = Router({});
authRouter.post('/login', authController.login);
authRouter.get('/me', authMiddlewareJWT, authController.authMe);

export default authRouter;
