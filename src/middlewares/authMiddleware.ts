import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { AUTH_USERNAME, AUTH_PASSWORD } = SETTINGS;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res
        .status(HTTP_STATUSES.UNAUTHORIZED)
        .json({ message: 'Authorization header is missing' });
      return;
    }

    if (authHeader.split(' ')[0] !== 'Basic') {
      res
        .status(HTTP_STATUSES.UNAUTHORIZED)
        .json({ message: 'Invalid authorization format' });
      return;
    }

    const decoded = Buffer.from(authHeader.split(' ')[1], 'base64').toString(
      'utf-8'
    );

    if (
      decoded.split(':')[0] !== AUTH_USERNAME ||
      decoded.split(':')[1] !== AUTH_PASSWORD
    ) {
      res
        .status(HTTP_STATUSES.UNAUTHORIZED)
        .json({ message: 'The authorization header is invalid' });
      return;
    }
  } catch (error) {
    console.error('auth middleware error:', error);
    res.sendStatus(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
  }

  next();
};
export default authMiddleware;
