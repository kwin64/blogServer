import { JwtPayload } from 'jsonwebtoken';
import authRepository from '../repositories/commands/authRepository';
import deviceSessionRepository from '../repositories/commands/deviceSessionRepository';
import userRepository from '../repositories/commands/usersRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';
import { CustomError } from '../utils/errors/CustomError ';
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

    const isPasswordValid = await bcryptHandler.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new CustomError('Invalid password', HTTP_STATUSES.UNAUTHORIZED);
    }

    let savedDeviceSession;

    const currentSession =
      await deviceSessionRepository.findSessionByDeviceName(
        title,
        user.id.toString()
      );

    if (currentSession) {
      savedDeviceSession = await deviceSessionRepository.updateSessionToken(
        user.id.toString(),
        currentSession.deviceId,
        Number(SETTINGS.REFRESH_EXPIRES_IN)
      );
    } else {
      savedDeviceSession = await deviceSessionRepository.saveDeviceSession(
        user.id.toString(),
        title,
        ip,
        Number(SETTINGS.REFRESH_EXPIRES_IN)
      );
    }

    const refreshToken = jwtToken.generateSessionToken(
      savedDeviceSession!.userId,
      savedDeviceSession!.deviceId,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    const accessToken = jwtToken.generateSessionToken(
      savedDeviceSession!.userId,
      savedDeviceSession!.deviceId,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

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
      1000000000000000000000
    );

    sendEmail(
      email,
      'Подтвердите почту',
      emailTemplates.registrationConfirmationEmail(accessToken)
    );
  },
  async confirmation(code: string) {
    let decoded;

    // какая то хуета
    try {
      decoded = jwtToken.verifyToken(
        code.toString(),
        SETTINGS.JWT_ACCESS_KEY
      ) as JwtPayload;
    } catch (error) {
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

    const { user } = await authRepository.findByLoginOrEmail(decoded!.login);

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
      decoded!.id
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
    const { userId, deviceId, exp } = jwtToken.verifyToken(
      refreshToken.toString(),
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const foundedCurrentSession =
      await deviceSessionRepository.findSessionByUserIdAndDeviceId(
        userId,
        deviceId
      );

    if (!foundedCurrentSession) {
      throw new CustomError('Session not found', HTTP_STATUSES.UNAUTHORIZED);
    }

    const date = new Date(foundedCurrentSession.expiresAt);

    const timeFoundedCurrentSession = Math.floor(date.getTime() / 1000);

    if (exp !== timeFoundedCurrentSession) {
      throw new CustomError(
        'Session expiration mismatch',
        HTTP_STATUSES.UNAUTHORIZED
      );
    }

    await deviceSessionRepository.deleteDeviceSessionByDeviceId(
      userId,
      deviceId
    );
  },
  async refresh(refreshToken: string) {
    const { userId, deviceId, exp } = jwtToken.verifyToken(
      refreshToken.toString(),
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const checkDeviceSession =
      await deviceSessionRepository.findSessionByDeviceIdAndUserId(
        deviceId,
        userId
      );

    if (!checkDeviceSession) {
      throw new CustomError('dont active session', HTTP_STATUSES.UNAUTHORIZED);
    }

    const date = new Date(checkDeviceSession.expiresAt);

    const timeFoundedCurrentSession = Math.floor(date.getTime() / 1000);

    if (exp !== timeFoundedCurrentSession) {
      throw new CustomError(
        'Session expiration mismatch',
        HTTP_STATUSES.UNAUTHORIZED
      );
    }

    const newRefreshToken = jwtToken.generateSessionToken(
      userId,
      deviceId,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    const accessToken = jwtToken.generateSessionToken(
      userId,
      deviceId,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    const upodatedDeviceSession =
      await deviceSessionRepository.updateSessionToken(
        userId,
        deviceId,
        Number(SETTINGS.REFRESH_EXPIRES_IN)
      );

    if (!upodatedDeviceSession) {
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

    return { accessToken, newRefreshToken };
  },
  async recovery(email: string) {
    const user = await authRepository.findUser(email);

    if (!user) {
      throw new CustomError('not founded user', HTTP_STATUSES.NO_CONTENT);
    }

    const recoveryCode = jwtToken.generateRecoveryCode(
      email,
      SETTINGS.JWT_RECOVERY_CODE
    );

    sendEmail(
      email,
      'Восстановить пароль',
      emailTemplates.recoveryEmail(recoveryCode)
    );
  },
  async confirmNewPassword(newPassword: string, recoveryCode: string) {
    const decoded = jwtToken.decodeCode(
      recoveryCode.toString(),
      SETTINGS.JWT_RECOVERY_CODE
    ) as JwtPayload;

    if (!decoded) {
      throw new CustomError(
        [
          {
            message: `recoveryCode ${recoveryCode} not decoded, invalid or expired recoveryCode`,
            field: 'recoveryCode',
          },
        ],
        HTTP_STATUSES.BAD_REQUEST
      );
    }

    const { user } = await authRepository.findByLoginOrEmail(decoded!.email);

    const isPasswordValid = await bcryptHandler.comparePassword(
      newPassword,
      user.password
    );

    if (isPasswordValid) {
      throw new CustomError('Invalid password', HTTP_STATUSES.UNAUTHORIZED);
    }

    const hashedPassword = await bcryptHandler.hashedPassword(newPassword, 10);

    const updatedPassword = await authRepository.updatePassword(
      user!.id.toString(),
      hashedPassword
    );

    return updatedPassword;
  },
};

export default authService;
