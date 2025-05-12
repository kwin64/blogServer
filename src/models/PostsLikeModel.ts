import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface LikesDocument extends Document {
  userId: Types.ObjectId;
  login: string;
}

const PostsLikesSchema: Schema<LikesDocument> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    login: { type: String, required: true },
  },
  { timestamps: true }
);
const PostsLikes: Model<LikesDocument> = mongoose.model<LikesDocument>(
  'PostsLikes',
  PostsLikesSchema
);
export default PostsLikes;
