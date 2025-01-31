import usersRepository from '../repositories/commands/usersRepository';
import bcrypt from 'bcrypt';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import ApiError from '../utils/ApiError';

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

      if (!existingUserByLogin) {
        throw ApiError.notFound('Login already exists.');
      }

      const existingUserByEmail = await usersRepository.findByEmail(
        userData.email
      );

      if (!existingUserByEmail) {
        throw ApiError.notFound('Email already exists');
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
  async deleteUser(id: string) {
    if (!id) {
      throw new Error('User ID must be provided');
    }

    try {
      const deletedUser = await usersRepository.delete(id);

      if (!deletedUser) {
        throw new Error(`User with ID ${id} not found`);
      }
      return deletedUser;
    } catch (error) {
      console.error(
        `Service error: Failed to delete user with ID ${id}:`,
        error
      );
      throw new Error('Could not delete user');
    }
  },
};

export default usersService;
