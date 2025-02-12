import { CommentDocument, IComment } from '../models/CommentModel';

export const mapCommentDocumentToCommentType = (
  commentDoc: CommentDocument
): IComment => {
  return {
    id: commentDoc._id.toString(),
    content: commentDoc.content,
    postId: commentDoc.postId.toString(),
    commentatorInfo: {
      userId: commentDoc.commentatorInfo.userId.toString(),
      userLogin: commentDoc.commentatorInfo.userLogin,
    },
    createdAt: commentDoc.createdAt!.toISOString(),
  };
};
