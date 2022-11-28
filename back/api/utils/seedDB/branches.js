const { Branch } = require("../../models");

const branches = [
  {
    name: "Sucursal 1",
    street: "9 de Julio",
    number: 1499,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    clientId: 2,
  },
  {
    name: "Sucursal 2",
    street: "Avenida Corrientes",
    number: 111,
    city: "Buenos Aires",
    province: "Buenos Aires",
    postalcode: "C1043AAB",
    clientId: 2,
  },
  {
    name: "Suc. Cabildo",
    street: "Av. Cabildo",
    number: 2349,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1428",
    clientId: 3,
  },
  {
    name: "Suc. Santa Fe",
    street: "Av. Santa Fe",
    number: 1860,
    city: "CABA",
    province: "Buenos Aires",
    postalcode: "C1123",
    clientId: 3,
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
