import testsRepository from '../repositories/commands/testsRepository';

const authService = {
  async createUser(userData: { loginOrEmail: string; password: string }) {
    try {
      return await testsRepository.deleteAllData();
    } catch (error) {
      console.error('Service error DB reset:', error);
      throw error;
    }
  },
};

export default authService;
