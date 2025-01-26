import { Request, Response } from 'express';
import blogQueryRepository from '../repositories/queries/blogQueryRepository';
import blogsService from '../services/blogsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import parseQueryParams from '../utils/parsers/parseQueryParams';

const blogsController = {
  async allBlogs(req: Request, res: Response): Promise<void> {
    try {
      const {
        searchNameTerm,
        sortBy,
        sortDirection,
        pageNumber,
        pageSize,
        offset,
      } = parseQueryParams.allBlogs(req.query);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Invalid page or limit parameters' });
        return;
      }

      const blogs = await blogQueryRepository.getAllBlogs(
        searchNameTerm,
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber
      );

      res.status(HTTP_STATUSES.OK).json(blogs);
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .json({ error: 'Failed to fetch blogs' });
    }
  },
  async newBlog(req: Request, res: Response) {
    try {
      const { name, description, websiteUrl } = req.body;

      const createdBlog = await blogsService.createBlog({
        name,
        description,
        websiteUrl,
      });

      res.status(HTTP_STATUSES.CREATED).json(createdBlog);
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.BAD_REQUEST)
        .json({ error: 'Failed to create blog' });
    }
  },
  async newPostForBlog(req: Request, res: Response) {
    try {
      const { title, shortDescription, content } = req.body;
      const { blogId } = req.params;

      const createdPost = await blogsService.createPostForBlog({
        title,
        shortDescription,
        content,
        blogId,
      });

      res.status(HTTP_STATUSES.CREATED).json(createdPost);
    } catch (error: any) {
      console.error('Controller Error:', error);

      res.status(HTTP_STATUSES.NOT_FOUND).json({ error: error.message });
    }
  },
  async getBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const blog = await blogsService.getBlog(id);

      res.status(HTTP_STATUSES.OK).json(blog);
    } catch (error: unknown) {
      console.error('Controller Error:', error);

      if (error instanceof Error && error.message.includes('not found')) {
        res.status(HTTP_STATUSES.NOT_FOUND).json({ error: error.message });
      } else {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to fetch blog' });
      }
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
        req.params.blogId,
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
    try {
      const { id } = req.params;
      const { name, description, websiteUrl } = req.body;

      const updatedBlog = await blogsService.changeBlog({
        id,
        name,
        description,
        websiteUrl,
      });

      if (!updatedBlog) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Blog not found or failed to update' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .json({ error: 'Failed to update blog' });
    }
  },
  async deleteBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deleted = await blogsService.deleteBlog(id);

      if (!deleted) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Blog not found or failed to delete' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error: unknown) {
      console.error('Controller Error:', error);
      res
        .status(HTTP_STATUSES.NOT_FOUND)
        .json({ error: 'Failed to delete blog' });
    }
  },
};
export default blogsController;
