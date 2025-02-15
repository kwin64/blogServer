import authRepository from '../repositories/commands/authRepository';
import userRepository from '../repositories/commands/usersRepository';
import userQueryRepository from '../repositories/queries/userQueryRepository';
import ApiError from '../utils/handlers/ApiError';
import bcryptHandler from '../utils/handlers/hashHandler';
import jwtToken from '../utils/handlers/jwtToken';
import sendEmail from '../utils/handlers/sendEmail';

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
      throw ApiError.badRequest('The login or email address is already taken.');
    }
    const hashedPassword = await bcryptHandler.hashedPassword(password, 10);

    const newUser = await userRepository.createUser({
      login,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      throw ApiError.internal('failed created newUser');
    }

    const token = jwtToken.generateToken(newUser._id.toString());

    const result = await sendEmail(
      'kwin649011@gmail.com',
      'Привет от Node.js!',
      `<h2>Добро пожаловать!</h2><p>Это письмо отправлено через Gmail SMTP.</p>`
    );

    return result;
    // Отправляем письмо с подтверждением
    // await sendVerificationEmail(email, token);
  },
};

export default authService;
