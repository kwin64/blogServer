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
};
export default postsRepository;
