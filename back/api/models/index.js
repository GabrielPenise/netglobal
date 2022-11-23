const Client = require("./Client");
const Branch = require("./Branch");
const Guard = require("./Guard");
const Events = require("./Events");
const Shift = require("./Shift");
const GuardShift = require("./GuardShift");

Client.hasMany(Branch);
Branch.belongsTo(Client);

Guard.belongsTo(Client);
Client.hasMany(Guard);

Events.belongsTo(Branch);
Client.hasMany(Events);
Events.belongsTo(Guard);
Guard.hasMany(Events);

Client.hasMany(Guard);
Guard.belongsTo(Client);

Guard.hasMany(GuardShift);
Shift.hasMany(GuardShift);
GuardShift.belongsTo(Guard);
GuardShift.belongsTo(Shift);

module.exports = { Branch, Guard, Client, Shift, GuardShift, Events };
