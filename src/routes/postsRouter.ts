import { Router } from 'express';
import postsController from '../controllers/postsController';

export const postsRouter = Router({});
postsRouter.get('/blogs', postsController.allPosts);
postsRouter.get('/blogs/:id', postsController.allPosts);
postsRouter.post('/blogs', postsController.allPosts); //auth path
postsRouter.put('/blogs/:id', postsController.allPosts); //auth path
postsRouter.delete('/blogs/:id', postsController.allPosts); //auth path
