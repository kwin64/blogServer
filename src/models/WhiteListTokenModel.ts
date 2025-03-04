import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IWhiteListToken {
  userId: string;
  refreshToken: string;
  deviceInfo: string;
  expiresAt: Date;
}

export interface WhiteLIstTokenDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  refreshToken: string;
  deviceInfo?: string;
  expiresAt: Date;
}

const WhiteListTokenSchema: Schema<WhiteLIstTokenDocument> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    refreshToken: { type: String, required: true },
    deviceInfo: { type: String },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
);
const WhiteListToken: Model<WhiteLIstTokenDocument> =
  mongoose.model<WhiteLIstTokenDocument>(
    'WhiteListToken',
    WhiteListTokenSchema
  );
export default WhiteListToken;
