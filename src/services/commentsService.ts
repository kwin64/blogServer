import mongoose from 'mongoose';
import commentsRepository from '../repositories/commands/commentsRepository';
import ApiError from '../utils/ApiError';

const commentsService = {
  async createCommentForPost(
    userId: string,
    userLogin: string,
    content: string
  ) {
    return await commentsRepository.createdCommemt(userId, userLogin, content);
  },
  async deleteComment(commentId: string) {
    if (!commentId) {
      throw ApiError.badRequest('Comment ID must be provided');
    }

    if (!mongoose.isValidObjectId(commentId)) {
      throw ApiError.badRequest(' Invalid ID comment');
    }

    const deletedComment = await commentsRepository.deleteComment(commentId);

    if (!deletedComment) {
      throw ApiError.notFound(`Comment with ID ${commentId} not found`);
    }

    return deletedComment;
  },
  async changeComment(commentId: string, content: string) {
    return await commentsRepository.changeComment(commentId, content);
  },
};

export default commentsService;
