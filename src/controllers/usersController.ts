import { Request, Response } from 'express';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import usersService from '../services/usersService';
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

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Invalid page or limit parameters' });
        return;
      }

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
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .json({ error: 'Failed to fetch blogs' });
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

      res.status(HTTP_STATUSES.CREATED).json(createdUser);
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ error: 'Failed to create user' });
    }
  },
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedUser = await usersService.deleteUser(id);

      if (!deletedUser) {
        res.status(HTTP_STATUSES.NOT_FOUND).json({
          error: 'User not found',
        });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedUser);
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ error: 'Failed to delete user' });
    }
  },
};
export default usersController;
