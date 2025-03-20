import { NextFunction, Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddlewareJWT';
import { AuthRequestRT } from '../middlewares/checkRefreshToken';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import authService from '../services/authService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';
import ApiError from '../utils/handlers/ApiError';

const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { loginOrEmail, password } = req.body;
      const ip = req.ip || req.headers['x-forwarded-for'] || '0.0.0.0';
      const title = req.headers['user-agent'] || 'unknown';

      const { accessToken, refreshToken } = await authService.login(
        loginOrEmail,
        password,
        ip,
        title
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 20 * 1000,
      });

      res.json({ accessToken });
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
  async confirmationEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.body;

      if (!code) {
        throw new CustomError(
          [{ message: 'Code is required', field: 'code' }],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      const verifyResult = await authService.confirmation(code as string);

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
  async logout(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;

      if (!refreshToken) {
        throw new CustomError('No refresh token', HTTP_STATUSES.UNAUTHORIZED);
      }

      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  async refreshToken(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;

      const { accessToken, newRefreshToken } = await authService.refresh(
        refreshToken
      );

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 20 * 1000,
      });

      res.json({ accessToken });
    } catch (error) {
      next(error);
    }
  },
  async passwordRecovery(
    req: AuthRequestRT,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new CustomError('email not founded', HTTP_STATUSES.NOT_FOUND);
      }
      await authService.recovery(email);
      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  async newPassword(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const { newPassword, recoveryCode } = req.body;

      if (!recoveryCode) {
        throw new CustomError(
          [{ message: 'recoveryCode is required', field: 'recoveryCode' }],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      const newPasswordResult = await authService.confirmNewPassword(
        newPassword,
        recoveryCode
      );

      if (!newPasswordResult) {
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
};
export default authController;
