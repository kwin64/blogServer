import { BlogDocument, IBlogWithPagination } from '../models/BlogModel';
import { mapDocumentWithPagination } from './mapDocumentWithPagination';

export const mapBlogDocumentWithPagination = (
  blogDoc: BlogDocument[],
  pagesCount: number,
  pageNumber: number,
  pageSize: number,
  totalCount: number
): IBlogWithPagination => {
  return mapDocumentWithPagination(
    blogDoc,
    pagesCount,
    pageNumber,
    pageSize,
    totalCount,
    (blogDoc) => ({
      id: blogDoc._id.toString(),
      name: blogDoc.name,
      description: blogDoc.description,
      websiteUrl: blogDoc.websiteUrl,
      createdAt: blogDoc.createdAt!,
      isMembership: blogDoc.isMembership,
    })
  );
};
