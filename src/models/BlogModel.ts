import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogDocument extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<BlogDocument> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    websiteUrl: { type: String, required: true },
  },
  { timestamps: true }
);

const Blog: Model<BlogDocument> = mongoose.model<BlogDocument>(
  'Blogs',
  BlogSchema
);

export default Blog;
