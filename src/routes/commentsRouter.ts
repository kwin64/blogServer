import { Router } from 'express';
import commentsController from '../controllers/commentsController';
import authMiddlewareJWT from '../middlewares/authMiddlewareJWT';

const commentsRouter = Router({});
commentsRouter.put(
  '/:commentId',
  authMiddlewareJWT,
  commentsController.changeComment
);
commentsRouter.post('/', authMiddlewareJWT, commentsController.createComment);
commentsRouter.delete(
  '/:commentId',
  authMiddlewareJWT,
  commentsController.deleteComment
);
commentsRouter.get('/:id', authMiddlewareJWT, commentsController.getComment);

export default commentsRouter;
