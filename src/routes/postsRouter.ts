import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';

const postsRouter = Router({});
postsRouter.get('/', postsController.allPosts);
// postsRouter.get('/:id', postsController.getPost);
postsRouter.post('/', authMiddleware, postsController.newPost);
// postsRouter.put('/:id', authMiddleware, postsController.allPosts);
// postsRouter.delete('/:id', authMiddleware, postsController.allPosts);

export default postsRouter;
