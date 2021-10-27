import knex from 'knex';
import { DatabaseOptions } from '../types/ServerOptions.js';
import { defaultDatabasePorts } from '../utils/Utilities.js';

export default class DatabaseService {
  dbConnection;

  options: DatabaseOptions;

  constructor(options: DatabaseOptions, connectionParameters?: any) {
    this.options = options;

    this.dbConnection = knex({
      client: options.ClientType === 'mariadb' ? 'mysql' : options.ClientType,
      connection: connectionParameters || options.ConnectionString || {
        host: options.Host,
        port: options.ClientType === 'sqlite' ? undefined : options.Port || defaultDatabasePorts[options.ClientType],
        user: options.User,
        password: options.Password,
        database: options.DatabaseName,
        filename: options.ClientType === 'sqlite' ? options.Filename : undefined,
      },
      useNullAsDefault: options.UseNullAsDefault || true,
    });
  }
}
