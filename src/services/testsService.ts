import testsRepository from "../repositories/commands/testsRepository";

const testsService = {
  async resetDB() {
    try {
      return await testsRepository.deleteAllData();
    } catch (error) {
      console.error('Service error DB reset:', error);
      throw error;
    }
  },
};

export default testsService;
