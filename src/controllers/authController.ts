import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import authService from '../services/authService';
import ApiError from '../utils/ApiError';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import bcryptHandler from '../utils/hashHandler';

const authController = {
  async login(req: Request, res: Response) {
    try {
      const { loginOrEmail, password } = req.body;

      const token = await authService.login(loginOrEmail, password);

      res.status(HTTP_STATUSES.OK).json({ accessToken: token });
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
  async authMe(req: AuthRequest, res: Response) {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        throw ApiError.notFound('Unauthorized');
      }

      const user = await userQueryRepository.getUserById(userId);

      res.status(HTTP_STATUSES.OK).json({
        email: user.email,
        login: user.login,
        userId: user.id,
      });
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
  async registration(req: Request, res: Response) {
    try {
      const { login, email, password } = req.body;

      const checkUser = await userQueryRepository.findUser(login, email);
      if (checkUser) {
        throw ApiError.badRequest(
          'The login or email address is already taken.'
        );
      }
      bcryptHandler.hashedPassword(password, 10);
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
