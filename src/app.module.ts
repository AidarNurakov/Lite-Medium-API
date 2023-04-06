import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
