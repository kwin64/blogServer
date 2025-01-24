import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import postsValidationMiddleware from '../middlewares/postsValidationMiddleware';

const postsRouter = Router({});
postsRouter.get('/', postsController.allPosts);
postsRouter.get('/:id', postsController.getPost);
postsRouter.post(
  '/',
  authMiddleware,
  postsValidationMiddleware,
  errorsMiddleware,
  postsController.newPost
);
postsRouter.put(
  '/:id',
  authMiddleware,
  postsValidationMiddleware,
  errorsMiddleware,
  postsController.changePost
);
postsRouter.delete('/:id', authMiddleware, postsController.deletePost);

export default postsRouter;
