import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('sqlite', () => ({
  host: process.env.SQLITE_HOST,
  port: process.env.SQLITE_PORT,
  username: process.env.SQLITE_USERNAME,
  password: process.env.SQLITE_PASSWORD,
  database: process.env.SQLITE_DATABASE,
}));
