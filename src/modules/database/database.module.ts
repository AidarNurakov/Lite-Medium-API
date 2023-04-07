import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeormConfig } from './typeorm.conifg';
import { UserEntity } from './entities/user.entity';
import { PostEntity } from './entities/post.entity';
import { UserRepository } from './repositories/user.repository';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeormConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity, PostEntity]),
  ],
  providers: [UserRepository, PostRepository],
  exports: [UserRepository, PostRepository],
})
export class DatabaseModule {}
