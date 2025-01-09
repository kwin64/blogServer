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
};
export default postsService;
