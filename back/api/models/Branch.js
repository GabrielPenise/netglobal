const S = require("sequelize");
const db = require("../config/db");

class Branch extends S.Model {}

Branch.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    street: {
      type: S.STRING,
      allowNull: false,
    },
    number: {
      type: S.INTEGER,
      allowNull: false,
    },
    city: {
      type: S.STRING,
      allowNull: false,
    },
    province: {
      type: S.STRING,
      allowNull: false,
    },
    latitude: {
      type: S.FLOAT /* La database NO toma tipo de dato GEOMETRY: PostGIS */,
      allowNull: false,
    },
    longitude: {
      type: S.FLOAT,
      allowNull: false,
    },
    fullAddress: {
      type: S.VIRTUAL,
      get() {
        return `${this.street} ${this.number}, ${this.city}, ${this.province}`;
      },
    },
    coordinates: {
      type: S.VIRTUAL,
      get() {
        return `${this.latitude}, ${this.longitude}`;
      },
    },
  },
  { sequelize: db, modelName: "branch" }
);

module.exports = Branch;
