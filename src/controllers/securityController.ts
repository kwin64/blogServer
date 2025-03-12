import { NextFunction, Response } from 'express';
import { AuthRequestRT } from '../middlewares/checkRefreshToken';
import jwtToken from '../utils/handlers/jwtToken';
import SETTINGS from '../utils/constants/settings';
import { JwtPayload } from 'jsonwebtoken';
import securityQueryRepository from '../repositories/queries/securityQueryRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import securityService from '../services/securityService';
import { CustomError } from '../utils/errors/CustomError ';

const securityController = {
  async getAllDevices(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;
      const { userId } = jwtToken.verifyToken(
        refreshToken,
        SETTINGS.JWT_REFRESH_KEY
      ) as JwtPayload;

      const activeSessions = await securityQueryRepository.getAllDevices(
        userId
      );

      res.status(HTTP_STATUSES.OK).json(activeSessions);
    } catch (error) {
      next(error);
    }
  },
  async terminateAllDevices(
    req: AuthRequestRT,
    res: Response,
    next: NextFunction
  ) {
    try {
      const refreshToken = req.refreshToken!;
      await securityService.terminateAllDevices(refreshToken);
      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
  async terminateDevice(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;
      const { deviceId } = req.body;

      if (!deviceId) {
        throw new CustomError(
          [
            {
              message: 'currentDeviceId is required',
              field: 'currentDeviceId',
            },
          ],
          HTTP_STATUSES.BAD_REQUEST
        );
      }

      await securityService.terminateDevice(refreshToken, deviceId);
      res.status(HTTP_STATUSES.NO_CONTENT).send();
    } catch (error) {
      next(error);
    }
  },
};
export default securityController;
