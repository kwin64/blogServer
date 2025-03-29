import { Like } from '../../models';

const likesRepository = {
  async findLikeByUserIdAndCommentId(commentId: string, userId: string) {
    return await Like.findOne({
      commentId,
      userId,
    });
  },
  async createLike(
    commentId: string,
    userId: string,
    status: 'Like' | 'Dislike' | 'None'
  ) {
    return await new Like({ commentId, userId, status }).save();
  },
  async deleteLike(commentId: string, userId: string) {
    return await Like.deleteOne({
      commentId,
      userId,
    });
  },
  async updateLikeStatus(
    commentId: string,
    userId: string,
    status: 'Like' | 'Dislike' | 'None'
  ) {
    return await Like.findOneAndUpdate(
      { commentId, userId },
      { status },
      { new: true }
    );
  },
  async countLikes(commentId: string) {
    return await Like.countDocuments({ commentId, status: 'Like' });
  },
  async countDislikes(commentId: string) {
    return await Like.countDocuments({ commentId, status: 'Dislike' });
  },
};

export default likesRepository;
