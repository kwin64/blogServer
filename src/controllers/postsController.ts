import { Request, Response } from 'express';
import postsService from '../services/postsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const postsController = {
  async allPosts(req: Request, res: Response) {
    try {
      const posts = await postsService.getPosts();
      res.status(HTTP_STATUSES.OK).json(posts);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
};
export default postsController;
