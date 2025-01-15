import dotenv from 'dotenv';
dotenv.config();

const SETTINGS = {
  PORT: process.env.PORT || 3004,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_NAME: process.env.DB_NAME,
  PATH: {
    BLOGS: '/blogs',
    POSTS: '/posts',
    TESTS: '/testing',
  },
};

export default SETTINGS;
