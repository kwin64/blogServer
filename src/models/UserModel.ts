import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IUser {
  id: string;
  login: string;
  password?: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserWithPagination {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: IUser[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  login: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

const UsersSchema: Schema<UserDocument> = new Schema(
  {
    login: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'Users',
  UsersSchema
);
export default User;
