import { mapPostDocumentToPostType } from '../../mappers/mapPostDocumentToPostType';
import { Post } from '../../models/';
import { IPost, PostDocument } from '../../models/PostModel';

const postsRepository = {
  async getPosts(): Promise<IPost[]> {
    const posts = await Post.find().lean();
    return posts.map(mapPostDocumentToPostType);
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
    try {
      const post = await Post.findOne({ _id: id }).lean();
      if (!post) {
        return null;
      }
      return mapPostDocumentToPostType(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      throw new Error('Database error while fetching post');
    }
  },
  async delete(id: string) {
    try {
      const result = await Post.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Database error while deleting post');
    }
  },
  async deletePostsByBlogId(blogId: string) {
    try {
      const result = await Post.deleteMany({ blogId });
      return result.deletedCount || 0;
    } catch (error) {
      console.error('Error deleting posts by blog ID:', error);
      throw new Error('Database error while deleting posts');
    }
  },
  async change(
    post: Omit<IPost, 'createdAt' | 'updatedAt'>
  ): Promise<IPost | null> {
    try {
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
      ).lean();

      return updatedPost ? mapPostDocumentToPostType(updatedPost) : null;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Database error while updating post');
    }
  },
};
export default postsRepository;
