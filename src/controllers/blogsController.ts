import { Request, Response } from 'express';
import { IBlog } from '../models/BlogModel';
import blogQueryRepository from '../repositories/queries/blogQueryRepository';
import blogsService from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const blogsController = {
  async allBlogs(req: Request, res: Response): Promise<void> {
    try {
      const searchValue =
        req.query.searchValue?.toString() === '' ||
        req.query.searchValue === undefined
          ? null
          : req.query.searchValue?.toString();
      const sortBy = req.query.sortBy?.toString() ?? 'createdAt';
      const sortDirection =
        req.query.sortDirection?.toString() === 'asc' ? 'asc' : 'desc';
      const pageNumber = Number(req.query.page);
      const pageSize = Number(req.query.limit);
      const offset = (pageNumber - 1) * pageSize;

      if (
        isNaN(pageNumber) ||
        pageNumber < 1 ||
        isNaN(pageSize) ||
        pageSize < 1
      ) {
        res.status(400).json({ error: 'Invalid page or limit parameters' });
        return;
      }

      const blogs = await blogQueryRepository.getAllBlogs(
        searchValue,
        sortBy,
        sortDirection,
        offset,
        pageSize
      );

      res.status(HTTP_STATUSES.OK).json(blogs);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async newBlog(req: Request, res: Response) {
    try {
      const createdBlog = await blogsService.createBlog({
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
      });

      if (!createdBlog) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Failed to create blog' });
        return;
      }

      res.status(HTTP_STATUSES.CREATED).json(createdBlog);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
  },
  async getBlog(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const blog = await blogsService.getBlog(id);
      res.status(HTTP_STATUSES.OK).json(blog);
    } catch (error) {
      console.log('error', error);

      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async changeBlog(req: Request, res: Response) {
    const blogData: Omit<IBlog, 'createdAt' | 'updatedAt' | 'isMembership'> = {
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
      res.status(HTTP_STATUSES.NOT_FOUND);
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
