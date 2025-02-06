import { Request, Response } from 'express';
import commentQueryRepository from '../repositories/queries/commentQueryRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import commentsService from '../services/commentsService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const commentsController = {
  async createComment(req: Request, res: Response) {
    try {
      const { content, userId } = req.body;

      if (!content || !userId) {
        throw ApiError.notFound('Content and userId are required');
      }

      const user = await userQueryRepository.getUserById(userId);

      if (!user) {
        throw ApiError.notFound('User not found');
      }

      const createComment = await commentsService.createComment(
        userId,
        user.login,
        content
      );

      if (!createComment) {
        throw ApiError.badRequest('Failed to create comment');
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
  async changeComment(req: Request, res: Response) {
    try {
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
  async deleteComment(req: Request, res: Response) {
    try {
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
  async getComment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const getMappedComment = await commentQueryRepository.getCommentById(id);
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
};
export default commentsController;
