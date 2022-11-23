const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const { getCoordinates } = require("../utils/coordinates");

class Guard extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
}

Guard.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    cuil: {
      type: S.BIGINT,
      unique: true,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: { min: 6 },
    },
    salt: {
      type: S.STRING,
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
    entry_time: {
      type: S.TIME,
      allowNull: false,
    },
    hours_per_day: {
      type: S.INTEGER,
      allowNull: false,
    },
    active: {
      type: S.BOOLEAN,
      defaultValue: true,
    },
    fullAddress: {
      type: S.VIRTUAL,
      get() {
        return `${this.street}, ${this.number}, ${this.number}, ${this.province}`;
      },
    },
    coordinates: {
      type: S.VIRTUAL,
      get() {
        return `${this.latitude}, ${this.longitude}`;
      },
    },
  },
  { sequelize: db, modelName: "guards" }
);

Guard.beforeCreate(async (guard) => {
  const salt = bcrypt.genSaltSync();
  guard.salt = salt;
  guard.hash(guard.password, salt).then((hash) => (guard.password = hash));

  const [latitude, longitude] = await getCoordinates(
    `${guard.street} ${guard.number}`,
    guard.city,
    guard.province,
    guard.postalcode
  );

  guard.latitude = latitude;
  guard.longitude = longitude;
});

module.exports = Guard;

/* status: {
  type: S.ENUM,
  values: ["activo", "inactivo", "licencia"],
  allowNull: false,
  defaultValue: "activo",
}, */
