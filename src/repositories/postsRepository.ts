import { mapPostDocumentToPostType } from '../mappers/mapPostDocumentToPostType';
import { Post } from '../models';
import { IPost } from '../models/PostModel';

const postsRepository = {
  async getPosts(): Promise<IPost[]> {
    return Post.find().lean<IPost[]>();
  },
  async create(
    post: Omit<IPost, 'createdAt' | 'updatedAt' | 'id'>
  ): Promise<IPost> {
    const newPost = new Post({
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
    });
    const savedPost = await newPost.save();
    return mapPostDocumentToPostType(savedPost);
  },
  async getPost(id: string): Promise<IPost | null> {
    return await Post.findOne({ _id: id }).lean<IPost>();
  },
  async delete(id: string) {
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return null;
    }
    return true;
  },
  async deletePostsByBlogId(blogId: string) {
    const result = await Post.deleteMany({ blogId });
    return result.deletedCount || 0;
  },
  async change(
    post: Omit<IPost, 'createdAt' | 'updatedAt'>
  ): Promise<IPost | null> {
    const updatedPost = await Post.findByIdAndUpdate(
      post.id,
      {
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
      },
      {
        new: true,
      }
    ).lean<IPost>();

    return updatedPost || null;
  },
};
export default postsRepository;
