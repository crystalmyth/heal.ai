import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();

let sequelize;
if(process.env.DB_TYPE === 'mysql') {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'sqlite',
        port: process.env.DB_PORT || 3306,
        timezone: '+05:30',
      });
} else {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE || './database.db',
      });
}

export default sequelize;