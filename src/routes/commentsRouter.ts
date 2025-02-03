import { Router } from 'express';
import commentsController from '../controllers/commentsController';

const commentsRouter = Router({});
commentsRouter.put('/:commentsId', commentsController.changeComment);
commentsRouter.post('/:commentsId', commentsController.createComment);
commentsRouter.delete('/:commentsId', commentsController.deleteComment);
commentsRouter.get('/:commentsId', commentsController.getComment);

export default commentsRouter;
