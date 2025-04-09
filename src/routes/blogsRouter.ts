import { Router } from 'express';
import blogsController from '../controllers/blogsController';
import authMiddleware from '../middlewares/authMiddleware';
import blogsValidationMiddleware from '../middlewares/blogsValidationMiddleware';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import postsForBlogValidationMiddleware from '../middlewares/postsForBlogValidationMiddleware';
import validateObjectIdParam from '../utils/validations/validateObjectIdParam';
import { container } from '../config/container';
import { BlogController } from '../controllers/BlogControllerClass';

// const blogController = container.get(BlogController);

const blogsRouter = Router({});

blogsRouter.get('/', blogsController.allBlogs);
// blogsRouter.post(
//   '/',
//   authMiddleware,
//   blogsValidationMiddleware,
//   errorsMiddleware,
//   blogController.newBlog.bind(blogController)
// );

blogsRouter.get('/:id', validateObjectIdParam('id'), blogsController.getBlog);
blogsRouter.get(
  '/:blogId/posts',
  validateObjectIdParam('blogId'),
  errorsMiddleware,
  blogsController.getPostsForBlog
);
blogsRouter.post(
  '/:blogId/posts',
  authMiddleware,
  validateObjectIdParam('blogId'),
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
