import dotenv from 'dotenv';
dotenv.config();

const settings = {
  PORT: process.env.PORT || 3004,
  PATH: {
    BLOGS: '/blogs',
    POSTS: '/posts',
    TESTS: '/testing',
  },
};

export default settings;
