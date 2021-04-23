const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const {
  dbName,
  dbPort,
  dbUser,
  dbPassword,
  dbDialect,
  dbHost,
} = process.env;

const db = new Sequelize(
  dbName,
  dbUser,
  dbPassword,
  { host: dbHost, dialect: dbDialect }
);

module.exports = db;
