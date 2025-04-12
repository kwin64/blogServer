import { Comment } from '../../models';
import { CommentDocument } from '../../models/CommentModel';
import ApiError from '../../utils/handlers/ApiError';

const commentsRepository = {
  async createdCommemt(
    userId: string,
    userLogin: string,
    postId: string,
    content: string
  ) {
    const newComment = new Comment({
      content,
      postId,
      commentatorInfo: {
        userId,
        userLogin,
      },
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: 'None',
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
  async getCommentById(_id: string) {
    return await Comment.findOne({ _id }).lean<CommentDocument>();
  },
  async findCommentAndUpdate(
    commentId: string,
    likesCount: number,
    dislikesCount: number
  ) {
    return await Comment.findByIdAndUpdate(commentId, {
      'likesInfo.likesCount': likesCount,
      'likesInfo.dislikesCount': dislikesCount,
    });
  },
  async updateMyStatusByCommentAndUser(
    commentId: string,
    userId: string,
    status: 'Like' | 'Dislike' | 'None'
  ) {
    return await Comment.findOneAndUpdate(
      {
        _id: commentId,
        'commentatorInfo.userId': userId,
      },
      {
        $set: { 'likesInfo.myStatus': status },
      },
      { new: true }
    );
  },
};

export default commentsRepository;
