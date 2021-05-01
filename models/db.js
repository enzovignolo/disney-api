const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
//Look for constants in the .env file
const {
  dbName,
  dbPort,
  dbUser,
  dbPassword,
  dbDialect,
  dbHost,
} = process.env;

//Initialize db connection
const db = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  { host: dbHost, port:dbPort,dialect: dbDialect }
);

module.exports = db;
