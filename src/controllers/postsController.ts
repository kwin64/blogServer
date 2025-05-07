import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import { IPost } from '../models/PostModel';
import commentQueryRepository from '../repositories/queries/commentQueryRepository';
import postQueryRepository from '../repositories/queries/postQueryRepository';
import commentsService from '../services/commentsService';
import postsService from '../services/postsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import ApiError from '../utils/handlers/ApiError';
import parseQueryParams from '../utils/parsers/parseQueryParams';
import validateInputId from '../utils/validations/validateInputId';
import { CustomError } from '../utils/errors/CustomError ';

const postsController = {
  async allPosts(req: Request, res: Response) {
    try {
      const { sortBy, sortDirection, pageNumber, pageSize, offset } =
        parseQueryParams.allPosts(req.query);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        throw ApiError.badRequest('Invalid page or limit parameters');
      }

      const posts = await postQueryRepository.getAllPosts(
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber
      );

      res.status(HTTP_STATUSES.OK).json(posts);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).json({
        error: 'Internal server error',
      });
    }
  },
  async newPost(req: Request, res: Response) {
    try {
      const createdPost = await postsService.createPost({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
      });

      if (!createdPost) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to create post' });
        return;
      }
      res.status(HTTP_STATUSES.CREATED).json(createdPost);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async getPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postsService.getPost(id);
      res.status(HTTP_STATUSES.OK).json(post);
    } catch (error: any) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).json({
        error: error.message || 'Post not found',
      });
    }
  },
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedPost = await postsService.deletePost(id);

      if (!deletedPost) {
        res.status(HTTP_STATUSES.NOT_FOUND).json({
          error: 'Post not found',
        });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedPost);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async changePost(req: Request, res: Response) {
    const { id } = req.params;
    const { title, shortDescription, content, blogId, blogName } = req.body;

    if (!title || !shortDescription || !content || !blogId || !blogName) {
      res.status(HTTP_STATUSES.BAD_REQUEST).json({
        error: 'Invalid input data',
      });
      return;
    }

    const postData: Omit<IPost, 'createdAt' | 'updatedAt'> = {
      id,
      title,
      shortDescription,
      content,
      blogId,
      blogName,
    };

    try {
      const changedPost = await postsService.changePost(postData);

      if (!changedPost) {
        res.status(HTTP_STATUSES.NOT_FOUND).json({
          error: 'Post not found',
        });
        return;
      }
      res.status(HTTP_STATUSES.NO_CONTENT).json(changedPost);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async newCommentForPost(req: AuthRequest, res: Response) {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const userId = req.user?.userId;

      if (!content || !postId) {
        throw ApiError.notFound('Content and postId are required');
      }

      if (!userId) {
        throw ApiError.notFound('Unauthorized');
      }

      validateInputId(postId);

      const createComment = await commentsService.createCommentForPost(
        userId,
        postId,
        content
      );

      if (!createComment) {
        throw ApiError.internal('Failed to create comment');
      }

      const getMappedComment = await commentQueryRepository.getCommentById(
        createComment._id.toString()
      );

      res.status(HTTP_STATUSES.CREATED).json(getMappedComment);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Unexpected error:', error);
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  },
  async getAllCommentsForPost(req: AuthRequest, res: Response) {
    try {
      const { postId } = req.params;
      const { sortBy, sortDirection, pageNumber, pageSize, offset } =
        parseQueryParams.allPosts(req.query);

      const post = await postsService.getPost(postId);

      if (!postId) {
        throw ApiError.notFound('postId are required');
      }

      if (!post) {
        throw ApiError.notFound(`Post with ID ${postId} not found`);
      }

      validateInputId(postId);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        throw ApiError.badRequest('Invalid page or limit parameters');
      }

      const comments = await commentQueryRepository.getAllCommentsForPost(
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber,
        postId
      );

      res.status(HTTP_STATUSES.OK).json(comments);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Unexpected error:', error);
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  },
  async changeLikeStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { postId } = req.params;
      const { likeStatus } = req.body;
      const userId = req.user!.userId;

      validateInputId(postId);

      if (!['Like', 'Dislike', 'None'].includes(likeStatus)) {
        throw new CustomError(
          [{ message: 'Invalid like status', field: 'likeStatus' }],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      const result = await postsService.updateLikeStatus(
        postId,
        likeStatus,
        userId
      );

      res.status(HTTP_STATUSES.NO_CONTENT).json(result);
    } catch (error) {
      next(error);
    }
  },
};
export default postsController;
