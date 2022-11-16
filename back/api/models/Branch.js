const S = require("sequelize");
const db = require("../config/db");

class Branch extends S.model {}

Branch.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    street: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    number: {
      type: S.INTEGER,
      allowNull: false,
    },
  },
  {
    city: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    province: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    geolocation: {
      type: S.GEOMETRY,
      allowNull: false,
    },
  },
  {
    fullAddress: {
      type: S.VIRTUAL,
      get() {
        return `${this.street} ${this.number}, ${this.city}, ${this.province}`;
      },
    },
  },
  { sequelize: db, modelName: "branch" }
);

module.exports = Branch;
