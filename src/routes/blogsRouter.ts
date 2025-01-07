import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import blogValidationMiddleware from '../utils/validations/blogsValidation';
import inputValidationMIddleware from '../utils/validations/inputValidationMIddleware';

export const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);

blogsRouter.post(
  '/',
  blogValidationMiddleware,
  inputValidationMIddleware,
  blogsController.newBlog
);
