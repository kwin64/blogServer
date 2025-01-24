import { Request, Response } from 'express';
import { IBlog } from '../models/BlogModel';
import blogQueryRepository from '../repositories/queries/blogQueryRepository';
import blogsService from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import parseQueryParams from '../utils/parsers/parseQueryParams';

const blogsController = {
  async allBlogs(req: Request, res: Response): Promise<void> {
    try {
      const {
        searchValue,
        sortBy,
        sortDirection,
        pageNumber,
        pageSize,
        offset,
      } = parseQueryParams.allBlogs(req.query);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        res.status(400).json({ error: 'Invalid page or limit parameters' });
        return;
      }

      const blogs = await blogQueryRepository.getAllBlogs(
        searchValue,
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber
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
  async newPostForBlog(req: Request, res: Response) {
    try {
      const createdPostForBlog = await blogsService.createPostForBlog({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.params.id,
      });
      res.status(HTTP_STATUSES.CREATED).json(createdPostForBlog);
    } catch (error: unknown) {
      if (error.message.includes('not found')) {
        res.status(HTTP_STATUSES.NOT_FOUND).json({ error: error.message });
      } else {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ error: 'Internal Server Error' });
      }
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
  async getPostsForBlog(req: Request, res: Response) {
    try {
      const { pageNumber, pageSize, sortBy, sortDirection, offset } =
        parseQueryParams.postsForBlog(req.query);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Invalid page or limit parameters' });
        return;
      }

      const blogs = await blogQueryRepository.getAllPostsBlog(
        sortBy,
        sortDirection,
        offset,
        pageSize,
        req.params.id,
        pageNumber
      );

      res.status(HTTP_STATUSES.OK).json(blogs);
    } catch (error) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .send('If specificied blog is not exists');
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
