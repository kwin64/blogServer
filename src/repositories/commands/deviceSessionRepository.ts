import mongoose from 'mongoose';
import { DeviceSession, WhiteListToken } from '../../models';
import { DeviceSessionDocument } from '../../models/DeviceSessionModel';

const deviceSessionRepository = {
  async findSessionByDeviceId(deviceId: string) {
    return await DeviceSession.findOne({
      deviceId,
    }).lean<DeviceSessionDocument>();
  },
  async deleteTokenByUserId(userId: string) {
    return await WhiteListToken.deleteMany({ userId });
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
      lastActiveDate: expiresAt,
      deviceId,
    });

    return await newSession.save();
  },
};

export default deviceSessionRepository;
