import cors from 'cors';
import express, { NextFunction } from 'express';
import blogsRouter from './routes/blogsRouter';
import postsRouter from './routes/postsRouter';
import testsRouter from './routes/testsRouter';
import authRouter from './routes/authRouter';
import SETTINGS from './utils/constants/settings';
import connectToDatabase from './utils/DB/database';
import usersRouter from './routes/usersRouter';
import commentsRouter from './routes/commentsRouter';
import { HTTP_STATUSES } from './utils/constants/httpStatuses';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';

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
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
app.use(SETTINGS.PATH.TESTS, testsRouter);

app.use(errorHandler);
