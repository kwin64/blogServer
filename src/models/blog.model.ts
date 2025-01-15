import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  name: string;
  description: string;
  websiteUrl: number;
}

const BlogSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  websiteUrl: { type: String, required: true },
});

const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
