import cors from 'cors';
import express from 'express';
import blogsRouter from './routes/blogsRouter';
import testsRouter from './routes/testsRouter';
import SETTINGS from './utils/constants/settings';
export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('server start');
});
app.use(SETTINGS.PATH.BLOGS, blogsRouter);
app.use(SETTINGS.PATH.TESTS, testsRouter);
