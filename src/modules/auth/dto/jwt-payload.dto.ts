export class JwtPayloadDto {
  uid: number;
  iat: number;
  t: 'accessToken' | 'refreshToken';
}
