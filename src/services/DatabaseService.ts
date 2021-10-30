/* eslint-disable import/prefer-default-export */
import knex, { Knex } from 'knex';

import { isTestingEnvironment } from '@/utils/Utilities';

let knexInstance: Knex;

export const knexConnection = (): Knex => {
  if (!knexInstance) {
    knexInstance = knex({
      client: 'postgres',
      connection: process.env.DATABASE_CONNECTION_STRING,
      useNullAsDefault: true,
      searchPath: isTestingEnvironment() ? 'testing_site' : 'public',
    });
  }

  return knexInstance;
};
