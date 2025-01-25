import { BlogDocument, IBlogWithPagination } from '../models/BlogModel';

export const mapBlogDocumentWithPaginationType = (
  blogDoc: BlogDocument[],
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
    items: blogDoc.map((blogDoc) => ({
      id: blogDoc._id.toString(),
      name: blogDoc.name,
      description: blogDoc.description,
      websiteUrl: blogDoc.websiteUrl,
      createdAt: blogDoc.createdAt!,
      isMembership: blogDoc.isMembership,
    })),
  };
};
