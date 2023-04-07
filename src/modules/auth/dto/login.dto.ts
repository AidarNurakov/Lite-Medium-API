import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: 'string',
    default: 'test@mail.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: 'string',
    default: 'root',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
