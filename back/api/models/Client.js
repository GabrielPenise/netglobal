const db = require("../config/db");
const { Sequelize, DataTypes } = require("sequelize");

const Client = sequelize.define("Client", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
  cuit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  razon_social: {
    type: DataTypes.INTEGER,
  },
  direccion: {
    type: DataTypes.STRING,
  },
  fecha_inicio_contrato: {
    type: DataTypes.DATE,
  },
  fecha_fin_contrato: {
    type: DataTypes.DATE,
  },
  super_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Client;
