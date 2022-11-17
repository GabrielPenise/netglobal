const Client = require("./Client");
const Branch = require("./Branch");
const Guards = require("./Guards")

// Client.hasMany(Branch);
// Branch.belongsTo(Client);

//Guards.belongsTo(Client)

module.exports = { Branch, Guards };
