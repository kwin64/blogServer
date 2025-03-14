import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IApiRequest {
  ip: string;
  url: string;
  date: string;
}

export interface ApiRequestDocument extends Document {
  _id: Types.ObjectId;
  ip: string;
  url: string;
  date: Date;
  expiresAt: Date;
}

const ApiRequestSchema: Schema<ApiRequestDocument> = new Schema(
  {
    ip: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: Date, default: Date.now },
    expiresAt: { type: Date, index: { expires: '10s' } },
  },
  { timestamps: true }
);

const ApiRequest: Model<ApiRequestDocument> =
  mongoose.model<ApiRequestDocument>('ApiRequest', ApiRequestSchema);

export default ApiRequest;
