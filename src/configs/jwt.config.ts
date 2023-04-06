import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('jwt', () => ({
  secretKey: process.env.JWT_SECRET_KEY,
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  accessTokenExpiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
}));
