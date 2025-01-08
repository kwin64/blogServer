import { NextFunction, Request, Response } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authUsername = SETTINGS.AUTH_USERNAME;
  const authPassword = SETTINGS.AUTH_PASSWORD;
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
    decoded.split(':')[0] !== authUsername ||
    decoded.split(':')[1] !== authPassword
  ) {
    res
      .status(HTTP_STATUSES.FORBIDDEN)
      .json({ message: 'The authorization header is invalid' });
    return;
  }

  next();
};
export default authMiddleware;
