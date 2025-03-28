import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { BlogService } from '../services/BlogServiceClass';
import { BlogQueryRepository } from '../repositories/queries/BlogQueryRepositoryClass';
import parseQueryParams from '../utils/parsers/parseQueryParams';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

@injectable()
export class BlogController {
  constructor(
    @inject(BlogQueryRepository)
    private blogQueryRepository: BlogQueryRepository,
    @inject(BlogService) private blogService: BlogService
  ) {}

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

      const blogs = await this.blogQueryRepository.getAllBlogs(
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
        .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
        .json({ error: 'Failed to fetch blogs' });
    }
  }
  async newBlog(req: Request, res: Response): Promise<void> {
    try {
      const { name, description, websiteUrl } = req.body;

      const createdBlog = await this.blogService.createBlog({
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
  }
  async newPostForBlog(req: Request, res: Response) {
    try {
      const { title, shortDescription, content } = req.body;
      const { blogId } = req.params;

      const createdPost = await this.blogService.createPostForBlog({
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
  }
}
