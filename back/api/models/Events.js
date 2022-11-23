const S = require("sequelize");
const db = require("../config/db");

class Events extends S.Model {}

Events.init(
  {
    date: {
      type: S.DATE,
      allowNull: false,
    },
    time_in: {
      type: S.DATE,
    },
    time_out: {
      type: S.DATE,
    },
    position_in_latitude: {
      type: S.FLOAT,
      allowNull: false,
    },
    position_in_longitude: {
      type: S.FLOAT,
      allowNull: false,
    },

    position_out_latitude: {
      type: S.FLOAT,
      allowNull: false,
    },
    position_out_longitude: {
      type: S.FLOAT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "events" }
);

module.exports = Events;
