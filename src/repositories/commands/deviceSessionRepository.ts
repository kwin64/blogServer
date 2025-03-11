import mongoose from 'mongoose';
import { DeviceSession } from '../../models';
import { DeviceSessionDocument } from '../../models/DeviceSessionModel';

const deviceSessionRepository = {
  async findSessionByDeviceId(deviceId: string) {
    return await DeviceSession.findOne({
      deviceId,
    }).lean<DeviceSessionDocument>();
  },
  async findSessionByDeviceIdAndUserId(deviceId: string, userId: string) {
    return DeviceSession.findOne({ deviceId, userId });
  },
  async findSessionByDeviceName(deviceName: string, userId: string) {
    return await DeviceSession.findOne({
      deviceName,
      userId,
    }).lean<DeviceSessionDocument>();
  },
  async saveDeviceSession(
    userId: string,
    deviceName: string,
    ip: string | string[],
    expiresTime: number
  ) {
    const deviceId = new mongoose.Types.ObjectId().toString();

    const now = new Date();
    const expiresAt = new Date(now.getTime() + expiresTime * 1000);

    const newSession = new DeviceSession({
      userId,
      ip,
      deviceName,
      lastActiveDate: now,
      expiresAt,
      deviceId,
    });

    return await newSession.save();
  },
  async deleteDeviceSession(deviceName: string, userId: string) {
    return await DeviceSession.deleteMany({ userId, deviceName });
  },
  async deleteDeviceSessionByDeviceId(userId: string, deviceId: string) {
    return await DeviceSession.deleteMany({ userId, deviceId });
  },
  async terminateAllDeviceSessions(userId: string, deviceId: string) {
    return await DeviceSession.deleteMany({
      userId,
      deviceId: { $ne: deviceId },
    });
  },
  async terminateDeviceSession(userId: string, deviceId: string) {
    return await DeviceSession.deleteOne({ userId, deviceId });
  },
};

export default deviceSessionRepository;
