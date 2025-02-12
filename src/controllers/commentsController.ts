import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import commentQueryRepository from '../repositories/queries/commentQueryRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import commentsService from '../services/commentsService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import validateInputId from '../utils/validations/validateInputId';

const commentsController = {
  async changeComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      if (!content) {
        throw ApiError.badRequest('Invalid input data');
      }

      const changedComent = await commentsService.changeComment(
        commentId,
        content
      );

      res.status(HTTP_STATUSES.NO_CONTENT).json(changedComent);
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
      const { commentId } = req.params;

      const deletedComment = await commentsService.deleteComment(commentId);

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedComment);
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
