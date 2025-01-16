import DB from '../DB/DB';
import { postType } from '../DB/DB.types';
import { mapPostDocumentToPostType } from '../mappers/mapPostDocumentToPostType';
import { Post } from '../models';
import { IPost } from '../models/PostModel';

const postsRepository = {
  async getPosts(): Promise<IPost[]> {
    return Post.find().lean<postType[]>();
  },
  async create(
    post: Omit<IPost, 'createdAt' | 'updatedAt' | 'id'>
  ): Promise<IPost> {
    const newPost = new Post({
      id: post.blogId,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.content,
      blogName: post.blogName,
    });
    const savedPost = await newPost.save();
    return mapPostDocumentToPostType(savedPost);
  },
  async getPost(id: string): Promise<IPost | null> {
    const foundedPost = await DB.posts.find((post) => post.id === id);
    if (foundedPost) {
      return foundedPost;
    } else {
      return null;
    }
  },
  async delete(id: string) {
    const index = await DB.posts.findIndex((post) => post.id === id);
    if (index === -1) {
      return null;
    }
    return DB.posts.splice(index, 1);
  },
  async deletePostsByBlogId(blogId: string) {
    DB.posts = await DB.posts.filter((post) => post.blogId !== blogId);
  },
  async change(
    post: Omit<IPost, 'createdAt' | 'updatedAt'>
  ): Promise<IPost | null> {
    const newPost: IPost | undefined = DB.posts.find(
      (item) => item.id === post.id
    );
    if (newPost) {
      newPost.title = post.title;
      newPost.shortDescription = post.shortDescription;
      newPost.content = post.content;
      return newPost;
    } else {
      return null;
    }
  },
};
export default postsRepository;
