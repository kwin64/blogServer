import { DeviceSession, WhiteListToken } from '../../models';
import { DeviceSessionDocument } from '../../models/DeviceSessionModel';

const deviceSessionRepository = {
  async saveRTtoWhiteList(userId: string, refreshToken: string, time: number) {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + time * 1000);

    const newWhiteListToken = new WhiteListToken({
      userId,
      refreshToken,
      deviceInfo: 'Device Information',
      expiresAt,
    });

    return await newWhiteListToken.save();
  },
  async findSessionByDeviceId(deviceId: string) {
    return await DeviceSession.findOne({ deviceId }).lean<DeviceSessionDocument>();
  },
  async deleteTokenByUserId(userId: string) {
    return await WhiteListToken.deleteMany({ userId });
  },
};

export default deviceSessionRepository;
