import dotenv from 'dotenv';
dotenv.config();

const SETTINGS = {
  PORT: process.env.PORT || 3004,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.DB_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET || 'jwt_default',
  PATH: {
    BLOGS: '/blogs',
    POSTS: '/posts',
    AUTH: '/auth',
    USERS: '/users',
    COMMENTS: '/comments',
    TESTS: '/testing',
  },
};

export default SETTINGS;
