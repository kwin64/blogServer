import { IPost, PostDocument } from '../models/PostModel';

export const mapPostDocumentToPostType = (postDoc: PostDocument): IPost => {
  return {
    id: postDoc._id.toString(),
    title: postDoc.title,
    shortDescription: postDoc.shortDescription,
    content: postDoc.content,
    blogId: postDoc.blogId,
    blogName: postDoc.blogName,
    createdAt: postDoc.createdAt,
    updatedAt: postDoc.updatedAt,
  };
};
