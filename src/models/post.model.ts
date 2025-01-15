import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
  blogName: string;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  blogId: { type: String, required: true },
  blogName: { type: String, required: true },
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
