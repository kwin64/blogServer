import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IComment {}

export interface ICommentWithPagination {}

export interface LikesDocument extends Document {
  commentId: Types.ObjectId;
  userId: Types.ObjectId;
  status: 'Like' | 'Dislike' | 'None';
}

const LikesSchema: Schema<LikesDocument> = new Schema(
  {
    commentId: { type: Schema.Types.ObjectId, ref: 'Comments', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    status: { type: String, enum: ['Like', 'Dislike', 'None'], required: true },
  },
  { timestamps: true }
);
const Likes: Model<LikesDocument> = mongoose.model<LikesDocument>(
  'Likes',
  LikesSchema
);
export default Likes;
