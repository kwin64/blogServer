import { Request, Response } from 'express';
import authService from '../services/authService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const authController = {
  async login(req: Request, res: Response) {
    try {
      const { loginOrEmail, password } = req.body;

      const authData = await authService.login({
        loginOrEmail,
        password,
      });

      res.status(HTTP_STATUSES.NO_CONTENT).json(authData);
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
export default authController;
