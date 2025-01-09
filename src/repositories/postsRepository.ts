import DB from '../DB/DB';
import { postType } from '../DB/DB.types';

const postsRepository = {
  async getPosts(): Promise<postType[]> {
    try {
      const allPosts = await DB.posts;
      return allPosts;
    } catch (error) {
      console.error('Error get posts with DB:', error);
      throw new Error('Database: get posts failed');
    }
  },
};
export default postsRepository;
