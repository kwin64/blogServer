import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import blogValidationMiddleware from '../utils/validations/blogsValidation';
import inputValidationMIddleware from '../utils/validations/inputValidationMIddleware';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', blogsController.getBlog);

blogsRouter.post(
  '/',
  //authMiddleware
  blogValidationMiddleware,
  inputValidationMIddleware,
  blogsController.newBlog
);

export default blogsRouter;
