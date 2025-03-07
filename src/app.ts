import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import {
  blogsRouter,
  postsRouter,
  usersRouter,
  authRouter,
  securityRouter,
  commentsRouter,
  testsRouter,
} from './routes';
import { HTTP_STATUSES } from './utils/constants/httpStatuses';
import SETTINGS from './utils/constants/settings';
import connectToDatabase from './utils/DB/database';

connectToDatabase();

export const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(HTTP_STATUSES.OK).send('server start');
});
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.AUTH, authRouter);
app.use(SETTINGS.PATH.SECURITY, securityRouter);
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
app.use(SETTINGS.PATH.TESTS, testsRouter);

app.use(errorHandler);
