import { HTTP_STATUSES } from './constants/httpStatuses';

export default class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(msg: string) {
    return new ApiError(HTTP_STATUSES.BAD_REQUEST, msg);
  }

  static unauthorized(msg: string) {
    return new ApiError(HTTP_STATUSES.UNAUTHORIZED, msg);
  }

  static forbiden(msg: string) {
    return new ApiError(HTTP_STATUSES.FORBIDDEN, msg);
  }

  static notFound(msg: string) {
    return new ApiError(HTTP_STATUSES.NOT_FOUND, msg);
  }

  static internal(msg: string) {
    return new ApiError(HTTP_STATUSES.INTERNAL_SERVER_ERROR, msg);
  }
}
