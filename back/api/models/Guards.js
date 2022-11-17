const S = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Guards extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
  validatePassword(password) {
    return this.hash(password, this.salt).then(
      (newHash) => newHash === this.password
    );
  }
} 

Guards.init(
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
      validate: { min: 6},
    },
    salt: {
      type: S.STRING
    },
    province: {
        type: S.STRING,
        allowNull: false,
    },
    localidad:{
        type:S.STRING,
        allowNull:false
    },
    entry_time:{
        type:S.TIME,
        allowNull:false
    },
    hours_per_day:{
        type:S.INTEGER,
        allowNull:false
    },
  },
  { sequelize: db, modelName: "guards" }
);

Guards.beforeCreate((guard) => {
  const salt = bcrypt.genSaltSync();
  guard.salt = salt;
  return guard
    .hash(guard.password, salt)
    .then((hash) => (guard.password = hash));
});

module.exports=Guards