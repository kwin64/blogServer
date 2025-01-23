import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import authMiddleware from '../middlewares/authMiddleware';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import errorsResultMIddleware from '../middlewares/errorsResultMIddleware';
import { validateObjectIdParam } from '../utils/validations/validateObjectIdParam';

const blogsRouter = Router({});
blogsRouter.get('/', blogsController.allBlogs);
blogsRouter.get('/:id', validateObjectIdParam('id'), blogsController.getBlog);
blogsRouter.get(
  '/:id/posts',
  validateObjectIdParam('id'),
  blogsController.getPostsForBlog
);
blogsRouter.post(
  '/',
  authMiddleware,
  blogsValidationMiddleware,
  errorsResultMIddleware,
  blogsController.newBlog
);
blogsRouter.put(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsValidationMiddleware,
  errorsResultMIddleware,
  blogsController.changeBlog
);
blogsRouter.delete(
  '/:id',
  authMiddleware,
  validateObjectIdParam('id'),
  blogsController.deleteBlog
);

export default blogsRouter;
