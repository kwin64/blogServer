import usersRepository from '../repositories/commands/usersRepository';

const usersService = {
  async createUser(userData: {
    login: string;
    email: string;
    password: string;
  }) {
    try {
      const newUser = await usersRepository.create(userData);
      return newUser;
    } catch (error) {
      console.error('Service error while creating user:', error);
      throw new Error('Failed to create user');
    }
  },
};

export default usersService;
