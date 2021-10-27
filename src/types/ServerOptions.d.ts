export interface DatabaseOptions {
  DatabaseDialect: string,
  Host: string,
  Port?: string,
  Username: string,
  Password: string,
}

export interface ServerOptions {
  Database?: DatabaseOptions,
}
