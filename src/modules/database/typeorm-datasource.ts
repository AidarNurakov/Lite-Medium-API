import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.SQLITE_HOST,
  port: +process.env.SQLITE_PORT,
  username: process.env.SQLITE_USERNAME,
  password: process.env.SQLITE_PASSWORD,
  database: process.env.SQLITE_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [path.join(__dirname, './entities/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
  useUTC: true,
});
