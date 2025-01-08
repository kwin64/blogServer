import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';

const postsRouter = Router({});
postsRouter.get('/blogs', postsController.allPosts);
postsRouter.get('/blogs/:id', postsController.allPosts);
postsRouter.post('/blogs', authMiddleware, postsController.allPosts);
postsRouter.put('/blogs/:id', authMiddleware, postsController.allPosts);
postsRouter.delete('/blogs/:id', authMiddleware, postsController.allPosts);

export default postsRouter;
