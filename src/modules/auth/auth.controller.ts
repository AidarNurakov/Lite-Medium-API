import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { routesConfig, validationPipeConfig } from '../../configs';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserEntity } from '../database/entities/user.entity';
import { Actor } from '../../shared/decorators/actor.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth [User]')
@Controller(routesConfig.auth.root)
@UsePipes(new ValidationPipe(validationPipeConfig))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: () => SignUpDto,
  })
  @ApiResponse({
    type: () => SignUpResponseDto,
  })
  @Post(routesConfig.auth.signUp)
  signUp(@Body() dto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(dto);
  }

  @ApiBody({
    type: () => LoginDto,
  })
  @ApiResponse({
    type: () => LoginResponseDto,
  })
  @Post(routesConfig.auth.login)
  login(@Body() dto: LoginDto): Promise<SignUpResponseDto> {
    return this.authService.login(dto);
  }

  @ApiBody({
    type: () => RefreshTokenDto,
  })
  @ApiResponse({
    type: () => RefreshTokenResponseDto,
  })
  @Post(routesConfig.auth.refreshToken)
  refreshToken(@Body() dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    type: () => UserEntity,
  })
  @Get(routesConfig.auth.me)
  getMe(@Actor() actor: UserEntity): UserEntity {
    return actor;
  }
}
