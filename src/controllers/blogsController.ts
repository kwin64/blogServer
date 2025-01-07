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
  async newBlog(req: Request, res: Response) {
    const { name, description, websiteUrl } = req.body;
    try {
      const newBlog = await blogsService.createBlog({
        name,
        description,
        websiteUrl,
      });
      res.status(HTTP_STATUSES.CREATED).json(newBlog);
    } catch (error) {
      res.status(HTTP_STATUSES.NOT_FOUND);
    }
  },
};
export default blogsController;
