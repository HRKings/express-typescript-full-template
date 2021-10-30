/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/first */
require('tsconfig-paths/register');

import dotenv from 'dotenv';
import { isProductionEnvironment, isTestingEnvironment } from '@/utils/Utilities';

if (!isProductionEnvironment()) {
  dotenv.config({ path: isTestingEnvironment() ? '../testing.env' : '../.env' });
}

const config = {
  main: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION_STRING,
    migrations: {
      extension: 'ts',
    },
  },
};

export default config;
