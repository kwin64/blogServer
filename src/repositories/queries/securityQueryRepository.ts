import { mapDeviceSessionDocumentToCommentType } from '../../mappers/mapDeviceSessionDocumentToCommentType';
import { mapUserDocumentToUserType } from '../../mappers/mapUserDocumentToUserType';
import { DeviceSession, User } from '../../models';
import { UserDocument } from '../../models/UserModel';
import ApiError from '../../utils/handlers/ApiError';

const securityQueryRepository = {
  async getAllDevices(userId: string) {
    const now = new Date();
    const deviceSession = await DeviceSession.find({
      userId,
      expiresAt: { $gte: now },
    });

    return mapDeviceSessionDocumentToCommentType(deviceSession);
  },
  async getUserById(_id: string) {
    const user = await User.findOne({ _id }).lean<UserDocument>();
    if (!user) {
      throw ApiError.internal('Failed to fetch users');
    } else {
      return mapUserDocumentToUserType(user);
    }
  },
};
export default securityQueryRepository;
