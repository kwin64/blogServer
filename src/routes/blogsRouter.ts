import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import authMiddleware from '../middlewares/authMiddleware';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import postsForBlogValidationMiddleware from '../middlewares/postsForBlogValidationMiddleware';
import validateObjectIdParam from '../utils/validations/validateObjectIdParam';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', validateObjectIdParam('id'), blogsController.getBlog);
blogsRouter.get(
  '/:id/posts',
  validateObjectIdParam('id'),
  errorsMiddleware,
  blogsController.getPostsForBlog
);
blogsRouter.post(
  '/:id/posts',
  authMiddleware,
  validateObjectIdParam('id'),
  postsForBlogValidationMiddleware,
  errorsMiddleware,
  blogsController.newPostForBlog
);
blogsRouter.post(
  '/',
  authMiddleware,
  blogsValidationMiddleware,
  errorsMiddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsValidationMiddleware,
  errorsMiddleware,
  blogsController.changeBlog
);
blogsRouter.delete(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsController.deleteBlog
);

export default blogsRouter;
