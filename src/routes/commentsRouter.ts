import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const commentsRouter = Router({});
commentsRouter.put('/:commentsId', commentsController.changeComment);
commentsRouter.post('/', commentsController.createComment);
commentsRouter.delete('/:commentsId', commentsController.deleteComment);
commentsRouter.get('/:id', commentsController.getComment);

export default commentsRouter;
