import { NextFunction, Router } from 'express';
import blogsController from '../controllers/blogsController';

export const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);

blogsRouter.post(
  '/',
  (req, res, next: NextFunction) => {
    next();
  },
  blogsController.newBlog
);
