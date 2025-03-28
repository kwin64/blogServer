import mongoose from 'mongoose';
import commentsRepository from '../repositories/commands/commentsRepository';
import postsRepository from '../repositories/commands/postsRepository';
import userRepository from '../repositories/commands/usersRepository';
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
    likeStatus: string,
    userId: string
  ) {
    const existingLike = await commentsRepository.findCommendByIdAndUserId(
      commentId,
      userId
    );

    if (!existingLike) {
      throw ApiError.notFound('id doesnt exists');
    }

    //отсюда , еще схему лайков нужно

    if (likeStatus === "None") {
      await db.comment_likes.destroy({ where: { comment_id: commentId, user_id: userId } });
    } else {
      await db.comment_likes.upsert({ comment_id: commentId, user_id: userId, status: likeStatus });
    }

    // Пересчитываем лайки/дизлайки
    const likesCount = await db.comment_likes.count({ where: { comment_id: commentId, status: "Like" } });
    const dislikesCount = await db.comment_likes.count({ where: { comment_id: commentId, status: "Dislike" } });

    await db.comments.update({ likesCount, dislikesCount }, { where: { id: commentId } });

    return res.status(204).send();
  },
};

export default commentsService;
