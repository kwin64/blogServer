import { IPost, PostDocument } from '../models/PostModel';

export const mapPostDocumentToPostType = (
  postDoc: PostDocument
): Omit<IPost, 'updatedAt'> => {
  return {
    id: postDoc._id.toString(),
    title: postDoc.title,
    shortDescription: postDoc.shortDescription,
    content: postDoc.content,
    blogId: postDoc.blogId,
    blogName: postDoc.blogName,
    createdAt: postDoc.createdAt,
    extendedLikesInfo: {
      dislikesCount: 0,
      likesCount: 0,
      myStatus: 'None',
      newestLikes: [],
    },
  };
};
