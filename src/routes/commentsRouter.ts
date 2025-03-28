import { Router } from 'express';
import commentsController from '../controllers/commentsController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';
import commentsValidationMiddleware from '../middlewares/commentsValidationMiddleware';
import errorsMiddleware from '../middlewares/errorsMiddleware';

const commentsRouter = Router({});
commentsRouter.put(
  '/:commentId',
  authMiddlewareJWT,
  commentsValidationMiddleware,
  errorsMiddleware,
  commentsController.changeComment
);
commentsRouter.delete(
  '/:commentId',
  authMiddlewareJWT,
  commentsController.deleteComment
);
commentsRouter.get('/:commentId', commentsController.getComment);
commentsRouter.put(
  '/:commentId/like-status',
  authMiddlewareJWT,
  commentsController.changeLikeStatus
);

export default commentsRouter;
