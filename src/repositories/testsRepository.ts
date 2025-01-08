import DB from '../DB/DB';

export const testsRepository = {
  async deleteAllData() {
    try {
      DB.blogs = [];
      DB.posts = [];
      return { success: true };
    } catch (error) {
      console.error('Error resetting DB:', error);
      throw new Error('Database reset failed');
    }
  },
};

export default testsRepository;
