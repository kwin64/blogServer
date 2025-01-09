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
  async getPost(id: string) {
    const post = await postsRepository.getPost(id);

    if (!post) {
      console.error('Service error: get post from DB:', post);
      throw new Error('post not found');
    }
    return post;
  },
  async deletePost(id: string) {
    const deletedPost = await postsRepository.delete(id);
    if (!deletedPost) {
      console.error('Service error: delete post in DB:', deletedPost);
      throw new Error('post not found');
    }
    return deletedPost;
  },
  async changePost(post: postType) {
    return await postsRepository.change(post);
  },
};
export default postsService;
