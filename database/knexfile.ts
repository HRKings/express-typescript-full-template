import dotenv from 'dotenv';
import { isProductionEnvironment } from '../src/utils/Utilities.js';

if (!isProductionEnvironment()) {
  dotenv.config({ path: '../../.env' });
}

const config = {
  main: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION_STRING || {
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    migrations: {
      extension: 'ts',
    },
  },

  make: {
    client: 'postgresql',
    migrations: {
      extension: 'ts',
      directory: '../../database/migrations',
    },
  },
};

export default config;
