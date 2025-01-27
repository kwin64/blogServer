import { Router } from 'express';
import usersController from '../controllers/usersController';
import authMiddleware from '../middlewares/authMiddleware';
import errorsMiddleware from '../middlewares/errorsMiddleware';
import usersValidationMiddleware from '../middlewares/usersValidationMiddleware';

const usersRouter = Router({});
usersRouter.get('/', authMiddleware, usersController.getUsers);
usersRouter.post(
  '/',
  authMiddleware,
  usersValidationMiddleware,
  errorsMiddleware,
  usersController.createUser
);
usersRouter.delete('/:id', authMiddleware, usersController.deleteUser);

export default usersRouter;
