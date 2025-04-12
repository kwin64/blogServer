import { CommentDocument, IComment } from '../models/CommentModel';

export const mapCommentDocumentToCommentType = (
  commentDoc: CommentDocument
): IComment => {
  return {
    id: commentDoc._id.toString(),
    content: commentDoc.content,
    commentatorInfo: {
      userId: commentDoc.commentatorInfo.userId.toString(),
      userLogin: commentDoc.commentatorInfo.userLogin,
    },
    likesInfo: {
      likesCount: commentDoc.likesInfo.likesCount,
      dislikesCount: commentDoc.likesInfo.dislikesCount,
      myStatus: 'None',
    },
    createdAt: commentDoc.createdAt!.toISOString(),
  };
};
