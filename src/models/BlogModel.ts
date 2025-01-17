import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isMembership: boolean;
}

export interface BlogDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isMembership: boolean;
}

const BlogSchema: Schema<BlogDocument> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    isMembership: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const Blog: Model<BlogDocument> = mongoose.model<BlogDocument>(
  'Blogs',
  BlogSchema
);

export default Blog;
