import { Request, Response } from 'express';
import { IPost } from '../models/PostModel';
import postQueryRepository from '../repositories/queries/postQueryRepository';
import postsService from '../services/postsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import parseQueryParams from '../utils/parsers/parseQueryParams';

const postsController = {
  async allPosts(req: Request, res: Response) {
    try {
      const { sortBy, sortDirection, pageNumber, pageSize, offset } =
        parseQueryParams.allPosts(req.query);

      if (isNaN(pageNumber) || isNaN(pageSize)) {
        res
          .status(HTTP_STATUSES.BAD_REQUEST)
          .json({ error: 'Invalid page or limit parameters' });
        return;
      }

      const posts = await postQueryRepository.getAllPosts(
        sortBy,
        sortDirection,
        offset,
        pageSize,
        pageNumber
      );

      res.status(HTTP_STATUSES.OK).json(posts);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
  },
  async newPost(req: Request, res: Response) {
    try {
      const createdPost = await postsService.createPost({
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
      });
      if (!createdPost) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to create post' });
        return;
      }
      res.status(HTTP_STATUSES.CREATED).json(createdPost);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async getPost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const post = await postsService.getPost(id);
      res.status(HTTP_STATUSES.OK).json(post);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedPost = await postsService.deletePost(id);

      if (!deletedPost) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Failed to deleted post' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedPost);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async changePost(req: Request, res: Response) {
    const postData: Omit<IPost, 'createdAt' | 'updatedAt'> = {
      id: req.params.id,
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: req.body.blogName,
    };
    try {
      const changedPost = await postsService.changePost(postData);
      if (!changedPost) {
        res
          .status(HTTP_STATUSES.NOT_FOUND)
          .json({ error: 'Failed to create post' });
        return;
      }
      res.status(HTTP_STATUSES.NO_CONTENT).json(changedPost);
    } catch (error) {
      console.error('Controller error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND);
    }
  },
};
export default postsController;
