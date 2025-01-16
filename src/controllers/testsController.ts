import { Request, Response } from 'express';
import testingService from '../services/testsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const testsController = {
  async resetDB(req: Request, res: Response) {
    try {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
};
export default testsController;
