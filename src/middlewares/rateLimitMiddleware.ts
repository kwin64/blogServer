import { Request, Response, NextFunction } from 'express';
import { ApiRequest } from '../models';
import { CustomError } from '../utils/errors/CustomError ';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const RATE_LIMIT = 5;
const TIME_WINDOW = 10 * 1000;

const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ip = req.ip || req.connection.remoteAddress;
  const url = req.originalUrl || req.baseUrl;

  const windowStart = new Date(Date.now() - TIME_WINDOW);

  try {
    const count = await ApiRequest.countDocuments({
      ip: ip,
      url: url,
      date: { $gte: windowStart },
    });

    if (count >= RATE_LIMIT) {
      throw new CustomError('Too Many Requests', HTTP_STATUSES.MANY_REQUESTS);
    }

    await ApiRequest.create({ ip, url });

    next();
  } catch (error) {
    next(error);
  }
};

export default rateLimitMiddleware;
