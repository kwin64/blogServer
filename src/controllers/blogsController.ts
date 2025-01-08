import { Request, Response } from 'express';
import blogsService from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const blogsController = {
  async allBlogs(req: Request, res: Response) {
    try {
      const blogs = await blogsService.getBlogs();
      res.status(HTTP_STATUSES.OK).json(blogs);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async newBlog(req: Request, res: Response) {
    const { name, description, websiteUrl } = req.body;
    try {
      const createdBlog = await blogsService.createBlog(
        name,
        description,
        websiteUrl
      );

      if (!createdBlog) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Failed to create blog' });
        return;
      }

      res.status(HTTP_STATUSES.CREATED).json(createdBlog);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND);
    }
  },
  async getBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog = await blogsService.getBlog(id);
      res.status(HTTP_STATUSES.OK).json(blog);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async changeBlog(req: Request, res: Response) {
    const { name, description, websiteUrl } = req.body;
    const { id } = req.params;
    try {
      const changedBlog = await blogsService.changeBlog(
        id,
        name,
        description,
        websiteUrl
      );

      if (!changedBlog) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Failed to create blog' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(changedBlog);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(HTTP_STATUSES.BAD_REQUEST);
    }
  },
  async deleteBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedBlog = await blogsService.deleteBlog(id);

      if (!deletedBlog) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Failed to deleted blog' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedBlog);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
};
export default blogsController;
