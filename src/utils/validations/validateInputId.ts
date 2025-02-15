import mongoose from 'mongoose';
import ApiError from '../handlers/ApiError';

const validateInputId = (id: string): void => {
  if (!mongoose.isValidObjectId(id)) {
    throw ApiError.badRequest(' Invalid ID comment');
  }
};

export default validateInputId;
