import { UserEntity } from '../../database/entities/user.entity';

export class SignUpResponseDto {
  accessToken: string;
  refreshToken: string;

  user: UserEntity;
}
