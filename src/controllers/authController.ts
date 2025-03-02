import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import authService from '../services/authService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import ApiError from '../utils/handlers/ApiError';
import { CustomError } from '../utils/errors/CustomError ';
import emailTemplates from '../utils/handlers/emailTemplates';
import SETTINGS from '../utils/constants/settings';

const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { loginOrEmail, password } = req.body;

      const token = await authService.login(loginOrEmail, password);

      res.status(HTTP_STATUSES.OK).json({ accessToken: token });
    } catch (error) {
      next(error);
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
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { login, email, password } = req.body;
      await authService.registration(login, email, password);
      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body;

      if (!code) {
        throw new CustomError(
          [{ message: 'Code is required', field: code }],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      const verifyResult = await authService.verify(code as string);

      if (!verifyResult) {
        throw new CustomError(
          'error verifyResult',
          HTTP_STATUSES.INTERNAL_SERVER_ERROR
        );
      }

      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  confirmEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;

      if (!code) {
        throw new CustomError(
          [{ message: 'Code is required', field: code }],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      res.send(emailTemplates.confirmEmailTemplate(code.toString()));
    } catch (error) {
      next(error);
    }
  },
  async resendConfirmationEmail(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;

      if (!email) {
        throw new CustomError('email not founded', HTTP_STATUSES.NOT_FOUND);
      }

      await authService.resendEmail(email as string);

      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  },
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      // const refreshToken = req.cookies.refreshToken;
      // if (!refreshToken) {
      //   throw new CustomError('No refresh token', HTTP_STATUSES.UNAUTHORIZED);
      // }
      // const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET!) as {
      //   userId: string;
      // };
      // const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      //   decoded.userId
      // );
      // res.cookie('refreshToken', newRefreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'strict',
      // });
      // res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  },
};
export default authController;
