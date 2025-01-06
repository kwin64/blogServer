import { Request, Response } from 'express';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const blogsController = {
  allBlogs: (req: Request, res: Response) => {
    res.status(HTTP_STATUSES.OK).send('test');
  },
};
export default blogsController;
