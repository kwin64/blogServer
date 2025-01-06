import cors from 'cors';
import express from 'express';
import { blogsRouter } from './routes/blogsRouter';
import { settings } from './utils/constants/settings';
export const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'GET: all videos /videos <br/> GET: find one video /videos/:id <br/> POST: create video /videos <br/> DELETE: delete video /videos/:id <br/> PUT: update video /videos/:id'
    );
});
app.use(settings.PATH.BLOGS, blogsRouter);
