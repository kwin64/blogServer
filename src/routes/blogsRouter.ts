import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import inputValidationMIddleware from '../middlewares/inputValidationMIddleware';
import authMiddleware from '../middlewares/authMiddleware';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', blogsController.getBlog);
blogsRouter.post(
  '/',
  authMiddleware,
  blogsValidationMiddleware,
  inputValidationMIddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  blogsValidationMiddleware,
  inputValidationMIddleware,
  blogsController.changeBlog
);
blogsRouter.delete('/:id', authMiddleware, blogsController.deleteBlog);

export default blogsRouter;
