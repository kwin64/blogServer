import cors from 'cors';
import express from 'express';
import blogsRouter from './routes/blogsRouter';
import testsRouter from './routes/testsRouter';
import postsRouter from './routes/postsRouter';
import SETTINGS from './utils/constants/settings';
import mongoose from 'mongoose';

mongoose
  .connect(SETTINGS.MONGODB as string)
  .then(() => console.log('db ok'))
  .catch((err) => console.log(err));
export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('server start');
});
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.POSTS, postsRouter);
app.use(SETTINGS.PATH.TESTS, testsRouter);
