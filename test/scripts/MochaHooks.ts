import chai from 'chai';
import chaiThings from 'chai-things';

import dotenv from 'dotenv';

import { knexConnection } from '@/services/DatabaseService';

// Load the .env for the testing environment
dotenv.config({ path: '.testing.env' });

// Declare the hooks that will be used globally by Mocha
export const mochaHooks = {
  /** This function executes before all tests when Mocha is its default mode */
  async beforeAll() {
    // Initialize Chain and add the modules to it
    chai.should();
    chai.use(chaiThings);

    // Create a new schema on the database, so we don't pollute the main development database
    // This ensures we can use the same database for development and automated testing purposes
    await knexConnection().schema.createSchemaIfNotExists('testing_site');

    // Executes all migrations on the testing schema, so we can guarantee the same environment needed
    await knexConnection().migrate.latest({
      schemaName: 'testing_site',
      directory: './database/migrations',
      extension: 'ts',
    });
  },

  /** This function executes after all tests when Mocha is its default mode */
  async afterAll() {
    // Drop the testing schema, so no trace of it is left behind
    // This guarantees a clean database and that every time we run a test, we are in a clean environment
    // making all tests more accurate and without interference of previous ones
    await knexConnection().schema.dropSchemaIfExists('testing_site', true);
    knexConnection().destroy();
  },
};
