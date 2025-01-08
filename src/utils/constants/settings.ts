import dotenv from 'dotenv';
dotenv.config();

const SETTINGS = {
  PORT: process.env.PORT || 3004,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  PATH: {
    BLOGS: '/blogs',
    POSTS: '/posts',
    TESTS: '/testing',
  },
};

export default SETTINGS;
