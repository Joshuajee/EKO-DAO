import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'containers-us-west-43.railway.app',
  port: 6836,
  username: 'postgres',
  password: 'hEBBIq2b0tv7lG2B1QaL',
  database: 'railway',
  entities: [`dist/features/**/entities/*.entity.{ts,js}`],
  migrations: [`dist/db/migrations/*.{ts,js}`],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
