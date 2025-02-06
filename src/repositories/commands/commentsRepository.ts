import { Comment } from '../../models';

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
};

export default commentsRepository;
