import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import authMiddleware from '../middlewares/authMiddleware';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import errorsResultMIddleware from '../middlewares/errorsResultMIddleware';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', blogsController.getBlog);
blogsRouter.post(
  '/',
  authMiddleware,
  blogsValidationMiddleware,
  errorsResultMIddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  blogsValidationMiddleware,
  errorsResultMIddleware,
  blogsController.changeBlog
);
blogsRouter.delete('/:id', authMiddleware, blogsController.deleteBlog);

export default blogsRouter;
