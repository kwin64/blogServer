import { JwtPayload } from 'jsonwebtoken';
import deviceSessionRepository from '../repositories/commands/deviceSessionRepository';
import SETTINGS from '../utils/constants/settings';
import jwtToken from '../utils/handlers/jwtToken';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';

const securityService = {
  async terminateAllDevices(refreshToken: string) {
    const { userId, deviceId } = jwtToken.verifyToken(
      refreshToken,
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    await deviceSessionRepository.terminateAllDeviceSessions(userId, deviceId);
  },
  async terminateDevice(refreshToken: string, deviceId: string) {
    const { userId } = jwtToken.verifyToken(
      refreshToken,
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const user = await deviceSessionRepository.findSessionByDeviceId(deviceId);
    if (!user) {
      throw new CustomError(
        [
          {
            message: 'device session not found',
            field: 'device session',
          },
        ],
        HTTP_STATUSES.NOT_FOUND
      );
    }

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
