import { NextFunction, Response } from 'express';
import { AuthRequestRT } from '../middlewares/checkRefreshToken';

const securityController = {
  async getAllDevices(req: AuthRequestRT, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.refreshToken!;
      console.log('refreshToken', refreshToken);
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
