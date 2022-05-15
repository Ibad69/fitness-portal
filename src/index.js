import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

export const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPW,
  {
    host: process.env.HOST,
    dialect: "mysql",

    pool: {
      max: 5,
      min: 0,
      accquire: 3000,
      idle: 1000,
    },
  }
);

// try {
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
