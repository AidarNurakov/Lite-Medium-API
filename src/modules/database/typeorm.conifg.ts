import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class TypeormConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { database } = this.configService.get('sqlite');

    return {
      type: 'sqlite',
      database,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [join(__dirname, './entities/*.entity{.ts,.js}')],
      synchronize: true,
    };
  }
}
