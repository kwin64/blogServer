import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IPost {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPostWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: IPost[];
}

export interface PostDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema<PostDocument> = new Schema(
  {   
    //fix
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    blogId: { type: String, required: true },
    blogName: { type: String, required: true },
    extendedLikesInfo: {
      dislikesCount: number,
      likesCount: number,
      myStatus: 'Like' | 'Dislike' | 'None',
      newestLikes: [],
    },
  },
  { timestamps: true }
);
const Post: Model<PostDocument> = mongoose.model<PostDocument>(
  'Posts',
  PostSchema
);
export default Post;
