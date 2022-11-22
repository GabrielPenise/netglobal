const S = require("sequelize");
const db = require("../config/db");

class Shift extends S.Model {}

Shift.init(
  {
    type: {
      type: S.ENUM,
      values: ["morning", "afternoon", "night"],
      allowNull: false,
    },
    start: {
      type: S.VARCHAR,
      allowNull: false,
    },
    end: {
      type: S.VARCHAR,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "shift" }
);

module.exports = Shift;
