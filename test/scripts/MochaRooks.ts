import chai from 'chai';
import chaiThings from 'chai-things';

import dotenv from 'dotenv';

import { knexConnection } from '@/services/DatabaseService';

dotenv.config({ path: '.testing.env' });

export const mochaHooks = {
  async beforeAll() {
    chai.should();
    chai.use(chaiThings);

    await knexConnection().schema.createSchemaIfNotExists('testing_site');
    await knexConnection().migrate.latest({
      schemaName: 'testing_site',
      directory: './database/migrations',
      extension: 'ts',
    });
  },

  async afterAll() {
    await knexConnection().schema.dropSchemaIfExists('testing_site', true);
    knexConnection().destroy();
  },
};
