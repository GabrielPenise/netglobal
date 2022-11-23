const Client = require("./Client");
const Branch = require("./Branch");
const Guards = require("./Guards");
const Shift = require("./Shift");
const GuardShift = require("./GuardShift");

Client.hasMany(Branch);
Branch.belongsTo(Client);

Client.hasMany(Guards);
Guards.belongsTo(Client);

Guards.hasMany(GuardShift);
Shift.hasMany(GuardShift);
GuardShift.belongsTo(Guards);
GuardShift.belongsTo(Shift);

module.exports = { Branch, Guards, Client, Shift, GuardShift };
