require("dotenv").config();

// node src/config/config.js

// yarn add dotenv

module.exports = {
  host: process.env.HOST,
  userName: process.env.USERNAME,
  pass: process.env.PASS,
  port: process.env.PORT,
  dialect: process.env.DIALECT,
  database: process.env.DATABASE,
};
