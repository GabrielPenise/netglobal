const S = require("sequelize");
const db = require("../config/db");

class Guards extends S.Model {} 

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
    cuil: {
      type: S.INTEGER,
      allowNull: false,
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
        type:S.TIME,
        allowNull:false
    },
  },
  { sequelize: db, modelName: "guards" }
);


module.exports=Guards