import mongoose, { Schema, Document, Model, Types } from 'mongoose';

export interface IDeviceSession {
  userId: string;
  ip: string;
  deviceName: string;
  lastActiveDate: Date;
  deviceId: string;
}

export interface DeviceSessionDocument extends Document {
  _id: Types.ObjectId;
  userId: string;
  ip: string;
  deviceName: string;
  lastActiveDate: Date;
  deviceId: string;
}

const DeviceSessionSchema: Schema<DeviceSessionDocument> = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    ip: { type: String, required: true },
    deviceName: { type: String, required: true },
    lastActiveDate: { type: Date, required: true },
    deviceId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);
const DeviceSession: Model<DeviceSessionDocument> =
  mongoose.model<DeviceSessionDocument>('DeviceSession', DeviceSessionSchema);
export default DeviceSession;
