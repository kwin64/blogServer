import { Router } from 'express';
import authController from '../controllers/usersController';

const authRouter = Router({});
// authRouter.post('/login', authController.createUser);

export default authRouter;
