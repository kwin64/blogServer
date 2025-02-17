import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import authService from '../services/authService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import ApiError from '../utils/handlers/ApiError';
import jwtToken from '../utils/handlers/jwtToken';

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

      const registrationResult = await authService.registration(
        login,
        email,
        password
      );
      res.status(HTTP_STATUSES.OK).json({ registrationResult });
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
  async verifyEmail(req: Request, res: Response) {
    try {
      const { code } = req.query;

      if (!code) {
        throw ApiError.notFound('code not founded');
      }

      await authService.verify(code as string);

      res.status(HTTP_STATUSES.NO_CONTENT).send();
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
