const { Guards } = require("../models");
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
    latitude: -34.602793,
    longitude: -58.369226,
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
    street: "Belgrano",
    number: 1004,
    city: "Campana",
    province: "Buenos Aires",
    latitude: -27.602793,
    longitude: -31.369226,
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
    street: "Bolivar",
    number: 1874,
    city: "Lujan",
    province: "Buenos Aires",
    latitude: -27.602793,
    longitude: -31.369226,
    entry_time: "8:00",
    hours_per_day: 8,
    clientId: 1,
  },
];

async function createGuards() {
  guards[0].salt = bcrypt.genSaltSync();
  guards[1].salt = bcrypt.genSaltSync();
  return bcrypt
    .hash(guards[0].password, guards[0].salt)
    .then((hashed) => (guards[0].password = hashed))
    .then(() => bcrypt.hash(guards[1].password, guards[1].salt))
    .then((hashed) => (guards[1].password = hashed))
    .then(() =>
      Guards.bulkCreate(guards).then(() => {
        console.log("GUARDS created ok");
      })
    );
}

module.exports = createGuards;
