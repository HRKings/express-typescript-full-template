export interface DatabaseOptions {
  DatabaseDialect: string,
  Host: string,
  Port?: string,
  Username: string,
  Password: string,
  DatabaseName: string,
}

export interface ServerOptions {
  Database?: DatabaseOptions,
}
