import DB from '../DB/DB';
import { postType } from '../DB/DB.types';

const postsRepository = {
  async getPosts(): Promise<postType[]> {
    try {
      return await DB.posts;
    } catch (error) {
      console.error('Error get posts with DB:', error);
      throw new Error('Database: get posts failed');
    }
  },
  async create(post: postType): Promise<postType> {
    try {
      DB.posts.push(post);
      return post;
    } catch (error) {
      console.error('Error set post in DB:', error);
      throw new Error('Database: set post failed');
    }
  },
  async getPost(id: string): Promise<postType | null> {
    try {
      const foundedPost = await DB.posts.find((post) => post.id === id);
      if (foundedPost) {
        return foundedPost;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error get post with DB:', error);
      throw new Error('Database: get post failed');
    }
  },
  async delete(id: string) {
    try {
      const index = await DB.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        return null;
      }
      return DB.posts.splice(index, 1);
    } catch (error) {
      console.error('Error delete post with DB:', error);
      throw new Error('Database: delete post failed');
    }
  },
  async change(post: postType): Promise<postType | null> {
    try {
      const newPost: postType | undefined = DB.posts.find(
        (item) => item.id === post.id
      );
      if (newPost) {
        newPost.title = post.title;
        newPost.shortDescription = post.shortDescription;
        newPost.content = post.content;
        newPost.blogName = post.blogName;
        return newPost;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error change post in DB:', error);
      throw new Error('Database: change post failed');
    }
  },
};
export default postsRepository;
