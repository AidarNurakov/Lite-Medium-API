import { UserEntity } from '../../database/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    type: 'string',
    default: 'token.token.token',
    description: 'Access Token',
  })
  accessToken: string;

  @ApiProperty({
    type: 'string',
    default: 'token.token.token',
    description: 'Refresh Token',
  })
  refreshToken: string;

  @ApiProperty({
    type: () => UserEntity,
    description: 'User',
  })
  user: UserEntity;
}
