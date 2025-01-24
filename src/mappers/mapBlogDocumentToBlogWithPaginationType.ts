import { IBlogWithPagination } from '../models/BlogModel';
import { PostDocument } from '../models/PostModel';

export const mapBlogDocumentToBlogWithPaginationType = (
  postDoc: any,
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
    items: postDoc,
  };
};
