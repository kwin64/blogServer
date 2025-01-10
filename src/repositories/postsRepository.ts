import DB from '../DB/DB';
import { postType } from '../DB/DB.types';

const postsRepository = {
  async getPosts(): Promise<postType[]> {
    return await DB.posts;
  },
  async create(post: postType): Promise<postType> {
    DB.posts.push(post);
    return post;
  },
  async getPost(id: string): Promise<postType | null> {
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
  async change(post: postType): Promise<postType | null> {
    const newPost: postType | undefined = DB.posts.find(
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
