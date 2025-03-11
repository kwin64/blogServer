import { JwtPayload } from 'jsonwebtoken';
import deviceSessionRepository from '../repositories/commands/deviceSessionRepository';
import SETTINGS from '../utils/constants/settings';
import jwtToken from '../utils/handlers/jwtToken';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';

const securityService = {
  async terminateAllDevices(refreshToken: string) {
    const decodedRefreshToken = jwtToken.verifyToken(
      refreshToken,
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const userId = decodedRefreshToken.param1;
    const deviceId = decodedRefreshToken.param2;

    await deviceSessionRepository.terminateAllDeviceSessions(userId, deviceId);
  },
  async terminateDevice(refreshToken: string, deviceId: string) {
    const decodedRefreshToken = jwtToken.verifyToken(
      refreshToken,
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const userId = decodedRefreshToken.param1;
    const currentDeviceId = decodedRefreshToken.param2;

    const deviceSession =
      await deviceSessionRepository.findSessionByDeviceIdAndUserId(
        deviceId,
        userId
      );

    if (!deviceSession) {
      throw new CustomError(
        [
          {
            message: 'bad user',
            field: 'currentDeviceId',
          },
        ],
        HTTP_STATUSES.FORBIDDEN
      );
    }

    await deviceSessionRepository.terminateDeviceSession(userId, deviceId);
  },
};

export default securityService;
