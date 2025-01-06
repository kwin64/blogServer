import dotenv from 'dotenv';
dotenv.config();

export const settings = {
  PORT: process.env.PORT || 3004,
  PATH: {
    blogs: '/blogs',
    posts: '/posts',
  },
};
