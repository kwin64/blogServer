import mongoose from 'mongoose';

const testsRepository = {
  async deleteAllData() {
    try {
      await mongoose.connection.dropDatabase();
      return { success: true };
    } catch (error) {
      console.error('Error resetting DB:', error);
      throw new Error('Database reset failed');
    }
  },
};

export default testsRepository;
