import { IPostWithPagination, PostDocument } from '../models/PostModel';
import { mapDocumentWithPagination } from './mapDocumentWithPagination';

export const mapPostDocumentWithPagination = (
  postDocs: PostDocument[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number
): IPostWithPagination => {
  return mapDocumentWithPagination(
    postDocs,
    pagesCount,
    pageNumber,
    pageSize,
    totalCount,
    (postDoc) => ({
      id: postDoc._id.toString(),
      title: postDoc.title,
      shortDescription: postDoc.shortDescription,
      content: postDoc.content,
      blogId: postDoc.blogId,
      blogName: postDoc.blogName,
      createdAt: postDoc.createdAt,
    })
  );
};
