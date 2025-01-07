import { Router } from 'express';
import blogsController from '../controllers/blogsController';

export const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
