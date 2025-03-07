import { Router } from 'express';
import securityController from '../controllers/securityController';
import checkRefreshToken from '../middlewares/checkRefreshToken';

const securityRouter = Router({});
securityRouter.get(
  '/devices',
  checkRefreshToken,
  securityController.getAllDevices
);
securityRouter.delete(
  '/devices',
  checkRefreshToken,
  securityController.terminateAllDevices
);
securityRouter.delete(
  '/devices/:deviceId',
  checkRefreshToken,
  securityController.terminateDevice
);

export default securityRouter;
