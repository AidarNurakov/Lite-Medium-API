import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.mogule';
import { AppController } from './app.controller';
import { PostModule } from './modules/post/post.module';
import { ConfigModule } from '@nestjs/config';
import { httpConfig, jwtConfig, sqliteConfig } from './configs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [httpConfig, sqliteConfig, jwtConfig],
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
