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
  JWT_RECOVERY_CODE: 'jwt_recovery_code',
  ACCESS_EXPIRES_IN: process.env.ACCESS_EXPIRES_IN || 10,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN || 20,
  EMAIL: process.env.TRANSPORTER_GMAIL_USER,
  EMAIL_PASSWORD: process.env.TRANSPORTER_GENERATE_PASSWORD_APP,
  PATH: {
    BLOGS: '/blogs',
    POSTS: '/posts',
    AUTH: '/auth',
    USERS: '/users',
    COMMENTS: '/comments',
    TESTS: '/testing',
    SECURITY: '/security',
  },
};

export default SETTINGS;
