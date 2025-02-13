import mongoose from 'mongoose';
import usersRepository from '../repositories/commands/usersRepository';
import ApiError from '../utils/ApiError';
import bcryptHandler from '../utils/hashHandler';

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

    const hashedPassword = await bcryptHandler.hashedPassword(
      userData.password,
      10
    );

    const createdUser = await usersRepository.createUser({
      login: userData.login,
      email: userData.email,
      password: hashedPassword,
    });

    return createdUser;
  },
  async deleteUser(id: string) {
    if (!id) {
      throw ApiError.badRequest('User ID must be provided');
    }

    if (!mongoose.isValidObjectId(id)) {
      throw ApiError.badRequest(' Invalid ID user');
    }

    const deletedUser = await usersRepository.deleteUser(id);

    if (!deletedUser) {
      throw ApiError.notFound(`User with ID ${id} not found`);
    }

    return deletedUser;
  },
};

export default usersService;
