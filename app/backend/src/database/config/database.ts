import 'dotenv/config';
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: 'TRYBE_FUTEBOL_CLUBE',
  host: process.env.PGHOST ,
  port: Number(process.env.PGPORT),
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
}

module.exports = config;
