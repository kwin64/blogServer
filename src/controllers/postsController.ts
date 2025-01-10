import { Request, Response } from 'express';
import { postType } from '../DB/DB.types';
import postsService from '../services/postsService';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import getRandomId from '../utils/getRandomId';

const postsController = {
  async allPosts(req: Request, res: Response) {
    try {
      const posts = await postsService.getPosts();
      res.status(HTTP_STATUSES.OK).json(posts);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
  },
  async newPost(req: Request, res: Response) {
    const postData: postType = {
      id: getRandomId(Date.now()),
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      blogId: req.body.blogId,
      blogName: req.body.blogName,
    };
    try {
      const createdPost = await postsService.createPost(postData);
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
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR).send(error);
    }
  },
  async deletePost(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deletedBlog = await postsService.deletePost(id);

      if (!deletedBlog) {
        res
          .status(HTTP_STATUSES.INTERNAL_SERVER_ERROR)
          .json({ error: 'Failed to deleted post' });
        return;
      }

      res.status(HTTP_STATUSES.NO_CONTENT).json(deletedBlog);
    } catch (error) {
      console.error('Controller Error:', error);
      res.status(HTTP_STATUSES.NOT_FOUND).send(error);
    }
  },
  async changePost(req: Request, res: Response) {
    const postData: postType = {
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
      res.status(HTTP_STATUSES.INTERNAL_SERVER_ERROR);
    }
  },
};
export default postsController;
