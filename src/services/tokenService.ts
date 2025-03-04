import { JwtPayload } from 'jsonwebtoken';
import SETTINGS from '../utils/constants/settings';
import jwtToken from '../utils/handlers/jwtToken';
import tokenRepository from '../repositories/commands/tokenRepository';
import { CustomError } from '../utils/errors/CustomError ';
import { HTTP_STATUSES } from '../utils/constants/httpStatuses';

const tokenService = {
  async refresh(refreshToken: string) {
    const decoded = jwtToken.verifyToken(
      refreshToken.toString(),
      SETTINGS.JWT_REFRESH_KEY
    ) as JwtPayload;

    const accessToken = jwtToken.generateToken(
      decoded.id,
      decoded.login,
      SETTINGS.JWT_ACCESS_KEY,
      Number(SETTINGS.ACCESS_EXPIRES_IN)
    );

    const newRefreshToken = jwtToken.generateToken(
      decoded.id,
      decoded.login,
      SETTINGS.JWT_REFRESH_KEY,
      Number(SETTINGS.REFRESH_EXPIRES_IN)
    );

    await tokenRepository.deleteOldToken(refreshToken);

    const savedRT = await tokenRepository.saveRTtoWhiteList(
      decoded.id,
      newRefreshToken,
      +SETTINGS.ACCESS_EXPIRES_IN
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
