import bcrypt from 'bcrypt';
import { User } from '../models';
import usersRepository from '../repositories/commands/usersRepository';
import ApiError from '../utils/ApiError';

const usersService = {
  async createUser(userData: {
    login: string;
    email: string;
    password: string;
  }) {
    const existingUserByLogin = await usersRepository.findByLogin(
      userData.login
    );

    if (existingUserByLogin) {
      throw ApiError.notFound('Login already exists');
    }

    const existingUserByEmail = await usersRepository.findByEmail(
      userData.email
    );

    if (existingUserByEmail) {
      throw ApiError.notFound('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new User({
      login: userData.login,
      email: userData.email,
      password: hashedPassword,
    });

    const createdUser = await usersRepository.create(newUser);

    return createdUser;
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
