import { mapCommentDocumentToCommentType } from '../../mappers/mapCommentDocumentToCommentType';
import { mapCommentDocumentWithPagination } from '../../mappers/mapCommentDocumentWithPagination';
import { Comment } from '../../models';
import { CommentDocument } from '../../models/CommentModel';
import ApiError from '../../utils/handlers/ApiError';

const commentQueryRepository = {
  async getCommentById(_id: string) {
    const comment = await Comment.findOne({ _id }).lean<CommentDocument>();

    if (!comment) {
      throw ApiError.notFound('Comment not found');
    }

    return mapCommentDocumentToCommentType(comment);
  },
  async getAllCommentsForPost(
    sortBy: string,
    sortDirection: string,
    offset: number,
    pageSize: number,
    pageNumber: number,
    postId: string
  ) {
    try {
      const totalCount = await Comment.countDocuments({ postId });
      const comments = await Comment.find({ postId })
        .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
        .skip(offset)
        .limit(pageSize)
        .exec();
      const pagesCount = Math.ceil(totalCount / pageSize);

      return mapCommentDocumentWithPagination(
        comments,
        pagesCount,
        pageNumber,
        pageSize,
        totalCount
      );
    } catch (error) {
      console.error('Error fetching comments for post:', error);
      throw new Error('Failed to fetch comments for post');
    }
  },
  async getCommentsAuthUser (commentId: string, userId: string) {
    return await Comment.findOne({
      commentId,
      userId,
    });
  }
};
export default commentQueryRepository;
