import { BlogDocument, IBlog } from '../models/BlogModel';

export const mapBlogDocumentToBlogType = (blogDoc: BlogDocument): IBlog => {
  return {
    id: blogDoc._id.toString(),
    name: blogDoc.name,
    description: blogDoc.description,
    websiteUrl: blogDoc.websiteUrl,
    createdAt: blogDoc.createdAt!,
    updatedAt: blogDoc.updatedAt!,
  };
};
