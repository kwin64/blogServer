import { JwtPayload } from 'jsonwebtoken';
import authRepository from '../repositories/commands/authRepository';
import deviceSessionRepository from '../repositories/commands/deviceSessionRepository';
import tokenRepository from '../repositories/commands/tokenRepository';
import userRepository from '../repositories/commands/usersRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';
import { CustomError } from '../utils/errors/CustomError ';
import ApiError from '../utils/handlers/ApiError';
import emailTemplates from '../utils/handlers/emailTemplates';
import bcryptHandler from '../utils/handlers/hashHandler';
import jwtToken from '../utils/handlers/jwtToken';
import sendEmail from '../utils/handlers/sendEmail';

const authService = {
  async login(
    loginOrEmail: string,
    password: string,
    ip: string | string[],
    title: string
  ) {
    const { user } = await authRepository.findByLoginOrEmail(loginOrEmail);

    const checkDeviceSession =
      await deviceSessionRepository.findSessionByDeviceName(
        title,
        user.id.toString()
      );

    if (checkDeviceSession) {
      await deviceSessionRepository.deleteDeviceSession(
        title,
        user.id.toString()
      );
    }

    const isPasswordValid = bcryptHandler.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid password');
    }

    const savedDeviceSession = await deviceSessionRepository.saveDeviceSession(
      user.id.toString(),
      title,
      ip,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    const refreshToken = jwtToken.generateToken(
      savedDeviceSession.userId,
      savedDeviceSession.deviceId,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    const accessToken = jwtToken.generateToken(
      savedDeviceSession.userId,
      savedDeviceSession.deviceId,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    if (!savedDeviceSession) {
      throw new CustomError(
        [
          {
            message: `Error  deviceSession .`,
            field: 'deviceSession',
          },
        ],
        HTTP_STATUSES.INTERNAL_SERVER_ERROR
      );
    }

    return { accessToken, refreshToken };
  },
  async registration(login: string, email: string, password: string) {
    const user = await userQueryRepository.findUser(login, email);

    if (user) {
      const errors = [];

      if (user.email) {
        errors.push({ message: 'Email is already taken', field: 'email' });
      }
      if (user.login) {
        errors.push({ message: 'Login is already taken', field: 'login' });
      }

      if (errors.length > 0) {
        throw new CustomError(errors, HTTP_STATUSES.BAD_REQUEST);
      }
    }

    const hashedPassword = await bcryptHandler.hashedPassword(password, 10);

    const newUser = await userRepository.createUser({
      login,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw new CustomError('User creation failed', HTTP_STATUSES.BAD_REQUEST);
    }

    const accessToken = jwtToken.generateToken(
      newUser._id.toString(),
      newUser.login,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    sendEmail(
      email,
      'Подтвердите почту',
      emailTemplates.registrationConfirmationEmail(accessToken)
    );
  },
  async confirmation(code: string) {
    const decoded = jwtToken.verifyToken(
      code.toString(),
      SETTINGS.JWT_ACCESS_KEY
    ) as JwtPayload;

    if (!decoded) {
      throw new CustomError(
        [
          {
            message: `code ${code} not decoded, invalid or expired code`,
            field: 'code',
          },
        ],
        HTTP_STATUSES.BAD_REQUEST
      );
    }

    const { user } = await authRepository.findByLoginOrEmail(decoded.login);

    if (user.isVerified) {
      throw new CustomError(
        [
          {
            message: `user verified`,
            field: 'code',
          },
        ],
        HTTP_STATUSES.BAD_REQUEST
      );
    }

    const verificationStatus = await authRepository.updateVerificationStatus(
      decoded.id
    );

    return verificationStatus;
  },
  async resendEmail(email: string) {
    const user = await authRepository.findUser(email);

    if (!user) {
      throw new CustomError(
        [{ message: `user ${email} not found`, field: 'email' }],
        HTTP_STATUSES.BAD_REQUEST
      );
    }

    if (user.isVerified) {
      throw new CustomError(
        [
          {
            message: `user verified`,
            field: 'email',
          },
        ],
        HTTP_STATUSES.BAD_REQUEST
      );
    }

    const accessToken = jwtToken.generateToken(
      user._id.toString(),
      user.login,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    sendEmail(
      email,
      'Подтвердите почту',
      emailTemplates.registrationConfirmationEmail(accessToken)
    );
  },
  async logout(refreshToken: string) {
    const decodedRefreshToken = jwtToken.verifyToken(
      refreshToken,
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;
    const userId = decodedRefreshToken.param1;
    const deviceId = decodedRefreshToken.param2;

    // if (!checkTokenInWhiteList) {
    //   throw new CustomError(
    //     'refreshToken not founded in white list',
    //     HTTP_STATUSES.UNAUTHORIZED
    //   );
    // }
    await deviceSessionRepository.deleteDeviceSessionByDeviceId(
      decodedRefreshToken.param1,
      decodedRefreshToken.param2
    );
  },
  async refresh(refreshToken: string) {
    const checkTokenInWhiteList = await tokenRepository.findTokenByRT(
      refreshToken
    );

    const decodedRefreshToken = jwtToken.verifyToken(
      refreshToken.toString(),
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    if (!checkTokenInWhiteList) {
      throw new CustomError(
        'refreshToken not founded in white list',
        HTTP_STATUSES.UNAUTHORIZED
      );
    }
    await tokenRepository.deleteToken(refreshToken);

    const accessToken = jwtToken.generateToken(
      decodedRefreshToken.id.toString(),
      decodedRefreshToken.login,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    const newRefreshToken = jwtToken.generateToken(
      decodedRefreshToken.id.toString(),
      decodedRefreshToken.login,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    const savedRT = await tokenRepository.saveRTtoWhiteList(
      decodedRefreshToken.id.toString(),
      newRefreshToken,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    if (!savedRT) {
      throw new CustomError(
        [
          {
            message: `Error saving new refresh token to whitelist.`,
            field: 'newRefreshToken',
          },
        ],
        HTTP_STATUSES.INTERNAL_SERVER_ERROR
      );
    }

    return { accessToken, newRefreshToken: savedRT.refreshToken };
  },
};

export default authService;
