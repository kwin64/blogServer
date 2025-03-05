import { WhiteListToken } from '../../models';

const tokenRepository = {
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
  async findTokenByUserId(userId: string) {
    return await WhiteListToken.findOne({ userId });
  },
  async findTokenByRT(refreshToken: string) {
    return await WhiteListToken.findOne({ refreshToken });
  },
  async deleteToken(oldRefreshToken: string) {
    return await WhiteListToken.deleteOne({ refreshToken: oldRefreshToken });
  },
  async deleteTokenByUserId(userId: string) {
    return await WhiteListToken.deleteMany({ userId });
  },
};

export default tokenRepository;
