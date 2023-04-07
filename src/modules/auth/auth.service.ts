import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../database/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { LoginDto } from './dto/login.dto';
import { comparePassword } from '../../shared/utils';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async findOrCreateUser(dto: SignUpDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);

    if (user) {
      return user;
    }

    return (await this.userService.createUser(dto)) as UserEntity;
  }

  async signUp(dto: SignUpDto): Promise<SignUpResponseDto> {
    if (dto.confirmPassword !== dto.password) {
      throw new BadRequestException('Password mismatch');
    }

    const user = await this.findOrCreateUser(dto);

    const { accessToken, refreshToken } = this.generateJwtTokens({
      uid: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async login(dto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('Unable found user by login');
    }

    const passwordIsEquals = await this.comparePassword(
      user.password,
      dto.password,
    );

    if (!passwordIsEquals) {
      throw new NotFoundException('Password is incorrect');
    }

    const { accessToken, refreshToken } = this.generateJwtTokens({
      uid: user.id,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async comparePassword(
    hashedPassword: string,
    password: string,
  ): Promise<boolean> {
    return comparePassword(hashedPassword, password);
  }

  generateJwtTokens(payload) {
    const { accessTokenExpiresIn, refreshTokenExpiresIn } =
      this.configService.get('jwt');

    return {
      accessToken: this.jwtService.sign(
        { ...payload, t: 'accessToken', iat: Date.now() },
        {
          expiresIn: accessTokenExpiresIn,
        },
      ),
      refreshToken: this.jwtService.sign(
        { ...payload, t: 'refreshToken', iat: Date.now() },
        {
          expiresIn: refreshTokenExpiresIn,
        },
      ),
    };
  }

  async extractToken(token: string): Promise<JwtPayloadDto> {
    return this.jwtService.verify(token);
  }

  async refreshToken(dto: RefreshTokenDto): Promise<RefreshTokenResponseDto> {
    const extractedToken = await this.extractToken(dto.refreshToken);

    const user = await this.userService.findById(extractedToken.uid);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.generateJwtTokens({ uid: user.id });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userService.findById(id);
  }
}
