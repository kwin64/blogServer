import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  isMembership?: boolean;
}
export interface IBlogWithPagination {
  pagesCount: number;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: IBlog[];
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
