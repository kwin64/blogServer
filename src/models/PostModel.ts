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
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    blogId: { type: String, required: true },
    blogName: { type: String, required: true },
  },
  { timestamps: true }
);
const Post: Model<PostDocument> = mongoose.model<PostDocument>(
  'Posts',
  PostSchema
);
export default Post;
