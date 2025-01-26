import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IUser {
  id: string;
  loginOrEmail: string;
  password: string;
}

export interface IUserWithPagination {
  pagesCount: number;
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: IUser[];
}

export interface UserDocument extends Document {
  _id: Types.ObjectId;
  loginOrEmail: string;
  password: string;
}

const UsersSchema: Schema<UserDocument> = new Schema(
  {
    loginOrEmail: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'Users',
  UsersSchema
);
export default User;
