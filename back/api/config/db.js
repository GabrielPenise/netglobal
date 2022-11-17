const Sequelize = require("sequelize");

const db = new Sequelize("net_security", "postgres", "brasil", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = db;
