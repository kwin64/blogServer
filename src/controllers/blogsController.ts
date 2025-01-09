import { Request, Response } from 'express';
import { blogType } from '../DB/DB.types';
import blogsService from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import getRandomId from '../utils/getRandomId';

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
    const blogData: blogType = {
      id: getRandomId(Date.now()),
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
    };
    try {
      const createdBlog = await blogsService.createBlog(blogData);

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
    const blogData: blogType = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
    };
    try {
      const changedBlog = await blogsService.changeBlog(blogData);
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
