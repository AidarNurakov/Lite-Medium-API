import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

export default new DataSource({
  type: 'sqlite',
  database: process.env.SQLITE_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join(__dirname, './entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
});
