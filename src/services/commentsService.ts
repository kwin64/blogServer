import mongoose from 'mongoose';
import commentsRepository from '../repositories/commands/commentsRepository';
import postsRepository from '../repositories/commands/postsRepository';
import userRepository from '../repositories/commands/usersRepository';
import ApiError from '../utils/ApiError';

const commentsService = {
  async createCommentForPost(userId: string, postId: string, content: string) {
    const user = await userRepository.getUserById(userId);
    const post = await postsRepository.getPostById(postId);

    if (!user) {
      throw ApiError.notFound('User not found');
    }
    if (!post) {
      throw ApiError.notFound('Post not found');
    }

    return await commentsRepository.createdCommemt(
      userId,
      user.login,
      postId,
      content
    );
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
  async changeComment(commentId: string, content: string, userId: string) {
    const comment = await commentsRepository.getCommentById(commentId);

    if (!comment) {
      throw ApiError.notFound('comment not found');
    }

    if (comment.commentatorInfo.userId.toString() !== userId) {
      throw ApiError.forbiden('Access denied');
    }

    return await commentsRepository.changeComment(commentId, content);
  },
};

export default commentsService;
