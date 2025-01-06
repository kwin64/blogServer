import { Router } from 'express';
import blogsController from '../controllers/blogsController';

export const blogsRouter = Router({});
blogsRouter.get('/all-blogs', blogsController.allBlogs);
