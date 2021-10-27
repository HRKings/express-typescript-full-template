export const isProductionEnvironment = () => process.env.NODE_ENV === 'production';
export const isDevelopmentEnvironment = () => process.env.NODE_ENV === 'development';
export const isTestingEnvironment = () => process.env.NODE_ENV === 'testing';

export const defaultDatabasePorts: Record<string, number> = {
  postgres: 5432,
  mysql: 3306,
  mariadb: 3306,
  mssql: 1433,
};
