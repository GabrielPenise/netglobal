const { Branch } = require("../models");

const branches = [
  {
    name: "Sucursal 1",
    street: "9 de Julio",
    number: 1499,
    city: "Rosario",
    province: "Santa Fe",
    latitude: -32.952926,
    longitude: -60.645469,
    clientId: 2,
  },
  {
    name: "Sucursal 2",
    street: "Corrientes",
    number: 111,
    city: "Buenos Aires",
    province: "Buenos Aires",
    latitude: -34.602793,
    longitude: -58.369226,
    clientId: 2,
  },
];

async function createBranches() {
  for (let i = 0; i < branches.length; i++) {
    let branch = branches[i];
    await Branch.create(branch);
  }
  console.log("BRANCHES created ok");
}

module.exports = createBranches;
