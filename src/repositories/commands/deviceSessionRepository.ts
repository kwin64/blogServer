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
    const session = await DeviceSession.findOne({
      userId,
      deviceId,
      expiresAt: { $gt: new Date() },
    });

    return session;
  },
  async findSessionByUserIdAndDeviceId(userId: string, deviceId: string) {
    return await DeviceSession.findOne({
      userId,
      deviceId,
    });
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
  async updateSessionToken(
    userId: string,
    deviceId: string,
    expiresIn: number
  ) {
    const newExpiresAt = new Date(Date.now() + expiresIn * 1000);
    const newLastActiveDate = new Date();

    return await DeviceSession.findOneAndUpdate(
      { userId, deviceId },
      {
        expiresAt: newExpiresAt,
        lastActiveDate: newLastActiveDate,
      },
      { new: true }
    );
  },
  async updateLastActive(deviceId: string) {
    const now = new Date();

    return await DeviceSession.findOneAndUpdate(
      { deviceId: deviceId },
      { lastActiveDate: now },
      { new: true }
    ).lean<DeviceSessionDocument>();
  },
};

export default deviceSessionRepository;
