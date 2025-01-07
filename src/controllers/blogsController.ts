import { create } from 'domain';
import { Request, Response } from 'express';
import { blogsService } from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const blogsController = {
  async allBlogs(req: Request, res: Response) {
    try {
      const video = await blogsService.getBlogs();
      res.status(HTTP_STATUSES.OK).json(video);
    } catch (error) {
      res.status(HTTP_STATUSES.NOT_FOUND);
    }
  },
  async newBlog(req: Request, res: Response) {},
};
export default blogsController;
