const S = require("sequelize");
const db = require("../config/db");
const { getCoordinates } = require("../utils/coordinates");

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
    postalcode: {
      type: S.STRING,
      allowNull: false,
    },
    latitude: {
      type: S.FLOAT,
    },
    longitude: {
      type: S.FLOAT,
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    full_address: {
      type: S.VIRTUAL,
      get() {
        return `${this.street}, ${this.number}, ${this.city}, ${this.province}`;
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

Branch.beforeCreate(async (branch) => {
  const [latitude, longitude] = await getCoordinates(
    `${branch.street} ${branch.number}`,
    branch.city,
    branch.province,
    branch.postalcode
  );

  branch.latitude = latitude;
  branch.longitude = longitude;
});

module.exports = Branch;
