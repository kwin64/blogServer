import { Router } from 'express';
import authController from '../controllers/authController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';

const securityRouter = Router({});
securityRouter.get('/me', authMiddlewareJWT, authController.authMe);


export default securityRouter;
