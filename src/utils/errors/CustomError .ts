export class CustomError extends Error {
  statusCode: number;
  errorsMessages: { message: string; field?: string }[];

  constructor(
    errors: { message: string; field?: string }[] | string,
    statusCode: number
  ) {
    if (typeof errors === 'string') {
      super(errors);
      this.errorsMessages = [{ message: errors }];
    } else {
      super(errors.map((e) => e.message).join(', '));
      this.errorsMessages = errors;
    }

    this.statusCode = statusCode;
  }
}
