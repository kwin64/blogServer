import { Comment } from '../../models';
import ApiError from '../../utils/ApiError';

const commentsRepository = {
  async createdCommemt(userId: string, userLogin: string, content: string) {
    const newComment = new Comment({
      content,
      commentatorInfo: {
        userId,
        userLogin,
      },
    });

    const savedComment = await newComment.save();

    return savedComment;
  },
  async deleteComment(commentId: string) {
    return await Comment.findByIdAndDelete(commentId);
  },
  async changeComment(commentId: string, content: string) {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        content,
      },
      { new: true }
    ).lean();
    if (!updatedComment) {
      throw ApiError.notFound('Comment not found');
    }
    return updatedComment;
  },
};

export default commentsRepository;
