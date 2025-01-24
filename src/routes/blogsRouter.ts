import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import authMiddleware from '../middlewares/authMiddleware';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import postsForBlogValidationMiddleware from '../middlewares/postsForBlogValidationMiddleware';
import validateObjectIdParam from '../utils/validations/validateObjectIdParam';
import errorsResultMiddleware from '../middlewares/errorsResultMiddleware';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', validateObjectIdParam('id'), blogsController.getBlog);
blogsRouter.get(
  '/:id/posts',
  validateObjectIdParam('id'),
  errorsResultMiddleware,
  blogsController.getPostsForBlog
);
blogsRouter.post(
  '/:id/posts',
  authMiddleware,
  validateObjectIdParam('id'),
  postsForBlogValidationMiddleware,
  errorsResultMiddleware,
  blogsController.newPostForBlog
);
blogsRouter.post(
  '/',
  authMiddleware,
  blogsValidationMiddleware,
  errorsResultMiddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsValidationMiddleware,
  errorsResultMiddleware,
  blogsController.changeBlog
);
blogsRouter.delete(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsController.deleteBlog
);

export default blogsRouter;
