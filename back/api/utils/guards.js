const { Guards } = require("../models");
const bcrypt = require("bcrypt");

const guards = [
  {
    name: "Antonio",
    lastname: "López",
    email: "guard@guard.com",
    password: "123456",
    salt: "",
    cuil: 2,
    province: "Santa Fe",
    localidad: "Rosario",
    entry_time: "8:00",
    hours_per_day: 8,
    clientId: 2,
  },
  {
    name: "Sebastián",
    lastname: "Moreira",
    email: "vig@vig.com",
    password: "123456",
    salt: "",
    cuil: 3,
    province: "Buenos Aires",
    localidad: "Buenos Aires",
    entry_time: "8:00",
    hours_per_day: 8,
    clientId: 2,
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
