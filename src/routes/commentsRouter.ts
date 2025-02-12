import { Router } from 'express';
import commentsController from '../controllers/commentsController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';
import commentsValidationMiddleware from '../middlewares/commentsValidationMiddleware';

const commentsRouter = Router({});
commentsRouter.put(
  '/:commentId',
  authMiddlewareJWT,
  commentsValidationMiddleware,
  commentsController.changeComment
);
commentsRouter.delete(
  '/:commentId',
  authMiddlewareJWT,
  commentsController.deleteComment
);
commentsRouter.get('/:commentId', authMiddlewareJWT, commentsController.getComment);

export default commentsRouter;
