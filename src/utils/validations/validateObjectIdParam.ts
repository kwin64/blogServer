import { Request, Response, RequestHandler, NextFunction } from 'express';
import { HTTP_STATUSES } from '../constants/httpStatuses';

const validateObjectIdParam = (paramName: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];

    if (!/^[a-f\d]{24}$/i.test(id)) {
      res.status(HTTP_STATUSES.NOT_FOUND).json({ error: 'Invalid ID format' });
      return;
    }
    next();
  };
};
export default validateObjectIdParam;
