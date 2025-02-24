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

const authService = {
  async login(loginOrEmail: string, password: string) {
    const loginValue = await authRepository.findByLoginOrEmail(loginOrEmail);

    const isPasswordValid = bcryptHandler.comparePassword(
      password,
      loginValue.user.password
    );

    if (!isPasswordValid) {
      throw ApiError.unauthorized('Invalid password');
    }

    const token = jwtToken.generateToken(loginValue.user.id.toString());

    return token;
  },
  async registration(login: string, email: string, password: string) {
    const checkUser = await userQueryRepository.findUser(login, email);

    if (checkUser) {
      const errors = [];

      if (checkUser.email) {
        errors.push({ message: 'Email is already taken', field: 'email' });
      }
      if (checkUser.login) {
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

    const token = jwtToken.generateToken(newUser._id.toString());

    await sendEmail(
      email,
      'Подтвердите почту',
      emailTemplates.registrationConfirmationEmail(token)
    );
  },
  async verify(token: string) {
    const decoded = jwtToken.verifyToken(token.toString()) as JwtPayload;

    if (!decoded) {
      throw new CustomError(
        'Invalid or expired token',
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

    console.log('user', user);

    if (!user) {
      throw new CustomError('user not found', HTTP_STATUSES.NOT_FOUND);
    }

    if (user.isVerified) {
      throw new CustomError('user not found', HTTP_STATUSES.NOT_FOUND);
    }

    const token = jwtToken.generateToken(user._id.toString());

    await sendEmail(
      email,
      'Подтвердите почту',
      emailTemplates.registrationConfirmationEmail(token)
    );
  },
};

export default authService;
