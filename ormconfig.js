/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');

let dbConfig = {
  migrations: ['dist/migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};

console.log('API_ENV => ', process.env.API_ENV);

switch (process.env.API_ENV) {
  case 'local': {
    dbConfig = {
      ...dbConfig,
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
    };
    break;
  }
  case 'test': {
    break;
  }
  default: {
    dbConfig = {
      ...dbConfig,
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['**/*.entity.js'],
    };
  }
}

module.exports = dbConfig;
