import { Request, Response } from 'express';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import usersService from '../services/usersService';
import ApiError from '../utils/handlers/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import parseQueryParams from '../utils/parsers/parseQueryParams';

const usersController = {
  async getUsers(req: Request, res: Response) {
    try {
      const {
        searchLoginTerm,
        searchEmailTerm,
        sortBy,
        sortDirection,
        pageNumber,
        pageSize,
        offset,
      } = parseQueryParams.allUsers(req.query);

      const users = await userQueryRepository.getAllUsers(
        searchLoginTerm,
        searchEmailTerm,
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber
      );

      res.status(HTTP_STATUSES.OK).json(users);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Unexpected error:', error);
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  },
  async createUser(req: Request, res: Response) {
    try {
      const { login, email, password } = req.body;

      const createdUser = await usersService.createUser({
        login,
        email,
        password,
      });

      const newUser = await userQueryRepository.getUserById(
        createdUser._id.toString()
      );

      res.status(HTTP_STATUSES.CREATED).json(newUser);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Unexpected error:', error);
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser = await usersService.deleteUser(id);

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedUser);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Unexpected error:', error);
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ message: 'Internal Server Error' });
      }
    }
  },
};
export default usersController;
