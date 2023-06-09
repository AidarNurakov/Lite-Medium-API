import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    type: 'string',
    default: 'admin',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @ApiProperty({
    type: 'string',
    default: 'root',
    description: 'User password',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    type: 'string',
    default: 'root',
    description: 'Confirmed password',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword!: string;
}
