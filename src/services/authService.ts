import authRepository from '../repositories/commands/authRepository';
import userRepository from '../repositories/commands/usersRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import ApiError from '../utils/handlers/ApiError';
import bcryptHandler from '../utils/handlers/hashHandler';
import jwtToken from '../utils/handlers/jwtToken';
import sendEmail from '../utils/handlers/sendEmail';
import emailTemplates from '../utils/handlers/emailTemplates';
import { JwtPayload } from 'jsonwebtoken';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import { CustomError } from '../utils/errors/CustomError ';
import SETTINGS from '../utils/constants/settings';
import tokenRepository from '../repositories/commands/tokenRepository';

const authService = {
  async login(loginOrEmail: string, password: string) {
    const { user } = await authRepository.findByLoginOrEmail(loginOrEmail);

    const isPasswordValid = bcryptHandler.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid password');
    }

    const accessToken = jwtToken.generateToken(
      user.id.toString(),
      user.login,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    const refreshToken = jwtToken.generateToken(
      user.id.toString(),
      user.login,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    //надо ли это?
    // const checkTokenInWhiteList = await tokenRepository.findTokenByUserId(
    //   user.id.toString()
    // );

    // if (!checkTokenInWhiteList) {
    //   throw new CustomError(
    //     [
    //       {
    //         message: `refreshToken to whiteList`,
    //         field: 'refreshToken',
    //       },
    //     ],
    //     HTTP_STATUSES.BAD_REQUEST
    //   );
    // }

    const savedRT = await tokenRepository.saveRTtoWhiteList(
      user.id.toString(),
      refreshToken,
      +SETTINGS.ACCESS_EXPIRES_IN
    );

    if (!savedRT) {
      throw new CustomError(
        [
          {
            message: `Error saving refresh token to whitelist.`,
            field: 'refreshToken',
          },
        ],
        HTTP_STATUSES.INTERNAL_SERVER_ERROR
      );
    }

    return { accessToken, refreshToken: savedRT.refreshToken };
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
};

export default authService;
