import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import commentQueryRepository from '../repositories/queries/commentQueryRepository';
import commentsService from '../services/commentsService';
import ApiError from '../utils/handlers/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import validateInputId from '../utils/validations/validateInputId';
import { CustomError } from '../utils/errors/CustomError ';

const commentsController = {
  async changeComment(req: AuthRequest, res: Response) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const userId = req.user!.userId;

      if (!commentId) {
        throw ApiError.notFound('commentId are required');
      }

      validateInputId(commentId);

      if (!content) {
        throw ApiError.badRequest('Invalid input data');
      }

      const changedComent = await commentsService.changeComment(
        commentId,
        content,
        userId
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
  async deleteComment(req: AuthRequest, res: Response) {
    try {
      const { commentId } = req.params;
      const userId = req.user!.userId;

      validateInputId(commentId);

      const deletedComment = await commentsService.deleteComment(
        commentId,
        userId
      );

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
      const { commentId } = req.params;
      validateInputId(commentId);

      const getMappedComment = await commentQueryRepository.getCommentById(
        commentId
      );
      res.status(HTTP_STATUSES.OK).json(getMappedComment);
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
      const { commentId } = req.params;
      const { likeStatus } = req.body;
      const userId = req.user!.userId;

      if (!['Like', 'Dislike', 'None'].includes(likeStatus)) {
        throw new CustomError('Invalid like status', HTTP_STATUSES.BAD_REQUEST);
      }

      const result = await commentsService.updateLikeStatus(
        commentId,
        likeStatus,
        userId
      );

      res.status(HTTP_STATUSES.NO_CONTENT).json(result);
    } catch (error) {
      next(error);
    }
  },
};
export default commentsController;
