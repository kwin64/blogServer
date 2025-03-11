import { NextFunction, Response } from 'express';
import { AuthRequestRT } from '../middlewares/checkRefreshToken';
import jwtToken from '../utils/handlers/jwtToken';
import SETTINGS from '../utils/constants/settings';
import { JwtPayload } from 'jsonwebtoken';
import securityQueryRepository from '../repositories/queries/securityQueryRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const securityController = {
  async getAllDevices(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;
      const decodedRefreshToken = jwtToken.verifyToken(
        refreshToken,
        SETTINGS.JWT_REFRESH_KEY
      ) as JwtPayload;

      const userId = decodedRefreshToken.param1;

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
    } catch (error) {
      next(error);
    }
  },
  async terminateDevice(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;
    } catch (error) {
      next(error);
    }
  },
};
export default securityController;
