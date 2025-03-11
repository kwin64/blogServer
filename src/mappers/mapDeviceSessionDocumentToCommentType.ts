import { DeviceSessionDocument } from '../models/DeviceSessionModel';

export const mapDeviceSessionDocumentToCommentType = (
  DeviceSessionDocument: DeviceSessionDocument[]
) => {
  return DeviceSessionDocument.map((device) => ({
    ip: device.ip,
    title: device.deviceName,
    lastActiveDate: device.lastActiveDate,
    deviceId: device.deviceId,
  }));
};
