import { IBlogWithPagination } from '../models/BlogModel';
import { PostDocument } from '../models/PostModel';

export const mapBlogDocumentToBlogWithPaginationType = (
  postDoc: PostDocument[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number
): IBlogWithPagination => {
  return {
    pagesCount: pagesCount,
    page: pageNumber,
    pageSize: pageSize,
    totalCount: totalCount,
    items: postDoc.map((postDoc) => ({
      id: postDoc._id.toString(),
      title: postDoc.title,
      shortDescription: postDoc.shortDescription,
      content: postDoc.content,
      blogId: postDoc.blogId,
      blogName: postDoc.blogName,
      createdAt: postDoc.createdAt,
    })),
  };
};
