const Client = require("./Client");
const Branch = require("./Branch");
const Guards = require("./Guards")

Client.hasMany(Branch);
Branch.belongsTo(Client);

Guards.belongsTo(Client)
Client.hasMany(Guards)


module.exports = { Branch, Guards };
