import { Router } from 'express';
import authController from '../controllers/authController';

const authRouter = Router({});
authRouter.post('/login', authController.login);
authRouter.get('/me', authController.authMe);

export default authRouter;
