import usersRepository from '../repositories/commands/usersRepository';
import bcrypt from 'bcrypt';

const usersService = {
  async createUser(userData: {
    login: string;
    email: string;
    password: string;
  }) {
    try {
      const existingUserByLogin = await usersRepository.findByLogin(
        userData.login
      );
      if (existingUserByLogin) {
        throw new Error('Login already exists.');
      }

      const existingUserByEmail = await usersRepository.findByEmail(
        userData.email
      );
      if (existingUserByEmail) {
        throw new Error('Email already exists.');
      }

      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = await usersRepository.create({
        login: userData.login,
        email: userData.email,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      console.error('Service error while creating user:', error);
      throw new Error('Failed to create user');
    }
  },
};

export default usersService;
