const { Guard } = require("../../models");

const guards = [
  {
    name: "Antonio",
    lastname: "López",
    email: "antonio@guard.com",
    cuil: 2,
    password: "123456",
    street: "San Martin",
    number: 587,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    clientId: 2,
  },
  {
    name: "Juan",
    lastname: "Fernandez",
    email: "juan@guard.com",
    cuil: 5,
    password: "123456",
    street: "General Belgrano",
    number: 1004,
    city: "Campana",
    province: "Buenos Aires",
    postalcode: "B2804",
    clientId: 2,
  },
  {
    name: "Martin",
    lastname: "Martinez",
    email: "martin@guard.com",
    cuil: 8,
    password: "123456",
    street: "Ituzaingó",
    number: 232,
    city: "Lujan",
    province: "Buenos Aires",
    postalcode: "B6700",
    active: false,
    clientId: 2,
  },
  {
    name: "Facundo",
    lastname: "Tassi",
    email: "facundo@guard.com",
    cuil: 23,
    password: "123456",
    street: "Eva Perón",
    number: 2102,
    city: "Villa Gobernador Gálvez",
    province: "Santa Fe",
    postalcode: "S2124",
    clientId: 4,
  },
];

async function createGuards() {
  for (let i = 0; i < guards.length; i++) {
    let guard = guards[i];
    await Guard.create(guard);
  }
  console.log("GUARDS created ok");
}

module.exports = createGuards;
