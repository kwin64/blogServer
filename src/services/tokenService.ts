import { JwtPayload } from 'jsonwebtoken';
import tokenRepository from '../repositories/commands/tokenRepository';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';
import SETTINGS from '../utils/constants/settings';
import { CustomError } from '../utils/errors/CustomError ';
import jwtToken from '../utils/handlers/jwtToken';

const tokenService = {
  async refresh(refreshToken: string) {
    const decodedRefreshToken = jwtToken.verifyToken(
      refreshToken.toString(),
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    if (!decodedRefreshToken) {
      throw new CustomError(
        [
          {
            message: `refreshToken ${refreshToken} not decoded, invalid or expired code`,
            field: 'refreshToken',
          },
        ],
        HTTP_STATUSES.UNAUTHORIZED
      );
    }

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

    const checkTokenInWhiteList = await tokenRepository.findTokenByUserId(
      decodedRefreshToken.toString()
    );

    if (checkTokenInWhiteList) {
      await tokenRepository.deleteTokenByUserId(
        decodedRefreshToken.id.toString()
      );
    }

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

export default tokenService;
