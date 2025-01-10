import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';
import errorsResultMIddleware from '../middlewares/errorsResultMIddleware';
import postsValidationMiddleware from '../middlewares/postsValidationMiddleware';

const postsRouter = Router({});
postsRouter.get('/', postsController.allPosts);
postsRouter.get('/:id', postsController.getPost);
postsRouter.post(
  '/',
  authMiddleware,
  postsValidationMiddleware,
  errorsResultMIddleware,
  postsController.newPost
);
postsRouter.put(
  '/:id',
  authMiddleware,
  postsValidationMiddleware,
  errorsResultMIddleware,
  postsController.changePost
);
postsRouter.delete('/:id', authMiddleware, postsController.deletePost);

export default postsRouter;
