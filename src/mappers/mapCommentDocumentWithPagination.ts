import {
  CommentDocument,
  ICommentWithPagination,
} from '../models/CommentModel';
import { mapDocumentWithPagination } from './mapDocumentWithPagination';

export const mapCommentDocumentWithPagination = (
  commentDoc: CommentDocument[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number
): ICommentWithPagination => {
  return mapDocumentWithPagination(
    commentDoc,
    pagesCount,
    pageNumber,
    pageSize,
    totalCount,
    (commentDoc) => ({
      id: commentDoc._id.toString(),
      content: commentDoc.content,
      commentatorInfo: {
        userId: commentDoc.commentatorInfo.userId.toString(),
        userLogin: commentDoc.commentatorInfo.userLogin,
      },
      createdAt: commentDoc.createdAt.toISOString(),
    })
  );
};
