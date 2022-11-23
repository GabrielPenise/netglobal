const { Guard } = require("../models");
const bcrypt = require("bcrypt");

const guards = [
  {
    name: "Antonio",
    lastname: "López",
    email: "antonio@guard.com",
    cuil: 2,
    password: "123456",
    salt: "",
    street: "San Martin",
    number: 587,
    city: "Rosario",
    province: "Santa Fe",
    postalcode: "S2000",
    entry_time: "8:00",
    hours_per_day: 8,
    clientId: 2,
  },
  {
    name: "Juan",
    lastname: "Fernandez",
    email: "juan@guard.com",
    cuil: 5,
    password: "123456",
    salt: "",
    street: "General Belgrano",
    number: 1004,
    city: "Campana",
    province: "Buenos Aires",
    postalcode: "B2804",
    entry_time: "8:00",
    hours_per_day: 8,
    clientId: 2,
  },
  {
    name: "Martin",
    lastname: "Martinez",
    email: "martin@guard.com",
    cuil: 8,
    password: "123456",
    salt: "",
    street: "Ituzaingó",
    number: 232,
    city: "Lujan",
    province: "Buenos Aires",
    postalcode: "B6700",
    entry_time: "8:00",
    hours_per_day: 8,
    active: false,
    clientId: 2,
  },
];

async function createGuards() {
  for (let i = 0; i < guards.length; i++) {
    let guard = guards[i];
    await Guard.create(guard);
  }
  console.log("BRANCHES created ok");
}

module.exports = createGuards;
