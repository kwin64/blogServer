import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IBlackListToken {
  refreshToken: string;
}

export interface BlackListTokenDocument extends Document {
  _id: Types.ObjectId;
  refreshToken: string;
}

const BlackListTokenSchema: Schema<BlackListTokenDocument> = new Schema(
  {
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);
const BlackListToken: Model<BlackListTokenDocument> =
  mongoose.model<BlackListTokenDocument>(
    'BlackListToken',
    BlackListTokenSchema
  );
export default BlackListToken;
