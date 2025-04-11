import commentsRepository from '../repositories/commands/commentsRepository';
import likesRepository from '../repositories/commands/likesRepository';
import postsRepository from '../repositories/commands/postsRepository';
import userRepository from '../repositories/commands/usersRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';
import ApiError from '../utils/handlers/ApiError';
import validateInputId from '../utils/validations/validateInputId';

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
  async deleteComment(commentId: string, userId: string) {
    const comment = await commentsRepository.getCommentById(commentId);

    if (!comment) {
      throw ApiError.notFound('comment not found');
    }

    if (comment.commentatorInfo.userId.toString() !== userId) {
      throw ApiError.forbiden('Access denied');
    }

    validateInputId(commentId);

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
  async updateLikeStatus(
    commentId: string,
    likeStatus: 'Like' | 'Dislike' | 'None',
    userId: string
  ) {
    const comment = await commentsRepository.getCommentById(commentId);

    if (!comment) {
      throw new CustomError('Comment not found', HTTP_STATUSES.NOT_FOUND);
    }

    const existingLike = await likesRepository.findLikeByUserIdAndCommentId(
      commentId,
      userId
    );

    if (existingLike === null) {
      await likesRepository.createLike(commentId, userId, likeStatus);
    } else {
      if (likeStatus === 'None') {
        await likesRepository.deleteLike(commentId, userId);
      } else {
        await likesRepository.updateLikeStatus(commentId, userId, likeStatus);
      }
    }

    const likesCount = await likesRepository.countLikes(commentId);
    const dislikesCount = await likesRepository.countDislikes(commentId);

    return await commentsRepository.findCommentAndUpdate(
      commentId,
      likesCount,
      dislikesCount
    );
  },
};

export default commentsService;
