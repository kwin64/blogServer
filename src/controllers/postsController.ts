import { Request, Response } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const postsController = {
  allPosts: (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK).send('test');
  },
};
export default postsController;
