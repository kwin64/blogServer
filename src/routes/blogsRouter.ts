import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import blogValidationMiddleware from '../utils/validations/blogsValidation';
import inputValidationMIddleware from '../middlewares/inputValidationMIddleware';
import authMiddleware from '../middlewares/authMiddleware';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', blogsController.getBlog);
blogsRouter.post(
  '/',
  authMiddleware,
  blogValidationMiddleware,
  inputValidationMIddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  blogValidationMiddleware,
  inputValidationMIddleware,
  blogsController.changeBlog
);
blogsRouter.delete('/:id', authMiddleware, blogsController.deleteBlog);

export default blogsRouter;
