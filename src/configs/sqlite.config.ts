import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('sqlite', () => ({
  database: process.env.SQLITE_DATABASE,
}));
