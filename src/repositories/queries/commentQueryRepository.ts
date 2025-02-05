import mongoose from 'mongoose';
import { mapCommentDocumentToCommentType } from '../../mappers/mapCommentDocumentToCommentType';
import { Comment } from '../../models';
import { CommentDocument } from '../../models/CommentModel';
import ApiError from '../../utils/ApiError';

const commentQueryRepository = {
  async getCommentById(_id: string) {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw ApiError.badRequest('Invalid comment ID format');
    }

    const comment = await Comment.findOne({ _id }).lean<CommentDocument>();

    if (!comment) {
      throw ApiError.notFound('Comment not found');
    }

    return mapCommentDocumentToCommentType(comment);
  },
};
export default commentQueryRepository;
