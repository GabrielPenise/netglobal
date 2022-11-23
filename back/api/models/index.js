const Client = require("./Client");
const Branch = require("./Branch");
const Guards = require("./Guards");
const Events = require("./Events");

Client.hasMany(Branch);
Branch.belongsTo(Client);

Guards.belongsTo(Client);
Client.hasMany(Guards);

Events.belongsTo(Branch);
Client.hasMany(Events);
Events.belongsTo(Guards);
Guards.hasMany(Events);

module.exports = { Branch, Guards, Client, Events };
