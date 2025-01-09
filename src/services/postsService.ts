import { postType } from '../DB/DB.types';
import postsRepository from '../repositories/postsRepository';

const postsService = {
  async getPosts() {
    const posts = await postsRepository.getPosts();
    if (!posts) {
      console.error('Service error: get posts in DB:', posts);
      throw new Error('Posts not found');
    }
    return posts;
  },
  async createPost(post: postType) {
    return await postsRepository.create(post);
  },
};
export default postsService;
