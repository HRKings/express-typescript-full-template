export interface DatabaseOptions {
  ClientType: 'postgres' | 'sqlite' | 'mariadb' | 'mysql' | 'mssql',
  ConnectionString?: string,
  Host?: string,
  Port?: number,
  User?: string,
  Password?: string,
  Schema?: string,
  DatabaseName?: string,
  Filename?: string,
  UseNullAsDefault?: boolean,
}

export interface ServerOptions {
  Port?: number,
  Database?: DatabaseOptions,
}
