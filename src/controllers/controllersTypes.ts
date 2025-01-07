import { Request, Response } from 'express';

export type ReqParamsType<T> = Request<T>;

export type ReqBodyType<T> = Request<{}, {}, T>;

export type ReqQueryType<T> = Request<{}, {}, {}, T>;

// export type ErrorsType = {
//   errorsMessages: { message: string; field: string }[];
// };
