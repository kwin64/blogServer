import { Router } from 'express';
import postsController from '../controllers/postsController';
import authMiddleware from '../middlewares/authMiddleware';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';
import commentsValidationMiddleware from '../middlewares/commentsValidationMiddleware';
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
postsRouter.post(
  '/:postId/comments',
  authMiddlewareJWT,
  commentsValidationMiddleware,
  errorsMiddleware,
  postsController.newCommentForPost
);
postsRouter.get(
  '/:postId/comments',
  authMiddlewareJWT,
  errorsMiddleware,
  postsController.getAllCommentsForPost
);

postsRouter.delete('/:id', authMiddleware, postsController.deletePost);

export default postsRouter;
