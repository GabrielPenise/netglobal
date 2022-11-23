const S = require("sequelize");
const db = require("../config/db");
const Nominatim = require("nominatim-geocoder");

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

Branch.beforeCreate((branch) => {
  const geocoder = new Nominatim();

  return geocoder
    .search({
      street: `${branch.street} ${branch.number}`,
      city: branch.city,
      country: "Argentina",
      state: branch.province,
      postalcode: branch.postalcode,
    })
    .then((res) => {
      branch.latitude = res[0].lat;
      branch.longitude = res[0].lon;
    })
    .catch((error) => {
      console.error("ERROR nominatim", error);
    });
});

module.exports = Branch;
