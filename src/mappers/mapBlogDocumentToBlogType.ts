import { BlogDocument, IBlog } from '../models/BlogModel';

export const mapBlogDocumentToBlogType = (
  blogDoc: BlogDocument
): Omit<IBlog, 'updatedAt'> => {
  return {
    id: blogDoc._id.toString(),
    name: blogDoc.name,
    description: blogDoc.description,
    websiteUrl: blogDoc.websiteUrl,
    createdAt: blogDoc.createdAt!,
    isMembership: blogDoc.isMembership,
  };
};
