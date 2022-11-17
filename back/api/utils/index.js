const createClients = require("./clients");
const createBranches = require("./branches");
const createGuards = require("./guards");

createClients()
  .then(() => createBranches())
  .then(() => createGuards());
