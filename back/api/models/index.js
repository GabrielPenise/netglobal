const Client = require("./Client");
const Branch = require("./Branch");

Client.hasMany(Branch);
Branch.belongsTo(Client);

module.exports = { Client, Branch };
