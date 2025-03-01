import dotenv from 'dotenv';
dotenv.config();

const SETTINGS = {
  PORT: process.env.PORT || 3004,
  AUTH_USERNAME: process.env.AUTH_USERNAME,
  AUTH_PASSWORD: process.env.AUTH_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB_NAME: process.env.DB_NAME,
  JWT_ACCESS_KEY: process.env.JWT_ACCESS_KEY || 'jwt_access_key',
  JWT_REFRESH_KEY: process.env.JWT_REFRESH_KEY || 'jwt_refresh_key',
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || 900,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || 1800,
  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
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
