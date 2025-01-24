import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';
import { errorsResultMiddleware } from '../middlewares/errorsResultMiddleware';
import postsValidationMiddleware from '../middlewares/postsValidationMiddleware';

const postsRouter = Router({});
postsRouter.get('/', postsController.allPosts);
postsRouter.get('/:id', postsController.getPost);
postsRouter.post(
  '/',
  authMiddleware,
  postsValidationMiddleware,
  errorsResultMiddleware,
  postsController.newPost
);
postsRouter.put(
  '/:id',
  authMiddleware,
  postsValidationMiddleware,
  errorsResultMiddleware,
  postsController.changePost
);
postsRouter.delete('/:id', authMiddleware, postsController.deletePost);

export default postsRouter;
