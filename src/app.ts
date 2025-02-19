import cors from 'cors';
import express from 'express';
import blogsRouter from './routes/blogsRouter';
import postsRouter from './routes/postsRouter';
import testsRouter from './routes/testsRouter';
import authRouter from './routes/authRouter';
import SETTINGS from './utils/constants/settings';
import connectToDatabase from './utils/DB/database';
import usersRouter from './routes/usersRouter';
import commentsRouter from './routes/commentsRouter';

connectToDatabase();

export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('server start');
});
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.USERS, usersRouter);
app.use(SETTINGS.PATH.AUTH, authRouter);
app.use(SETTINGS.PATH.COMMENTS, commentsRouter);
app.use(SETTINGS.PATH.TESTS, testsRouter);
