import { Request, Response } from 'express';
import userQueryRepository from '../repositories/queries/userQueryRepository';
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
      const { loginOrEmail, password } = req.body;

      console.log('sjds');

      // const createdUser = await authService.createUser({
      //   loginOrEmail,
      //   password,
      // });

      // res.status(HTTP_STATUSES.CREATED).json(createdUser);
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ error: 'Failed to create user' });
    }
  },
};
export default usersController;
