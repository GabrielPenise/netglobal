const { Client } = require("../../models");
const bcrypt = require("bcrypt");

const clients = [
  {
    email: "admin@admin.com",
    password: "123456",
    cuit: 0,
    razon_social: "",
    direccion: "",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    super_admin: true,
    active: true,
    salt: "",
  },
  {
    email: "cliente@cliente.com",
    password: "123456",
    cuit: 1,
    razon_social: "Empresa S.A.",
    direccion: "Mitre, 1555, Rosario, Santa Fe",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    super_admin: false,
    active: true,
    salt: "",
  },
  {
    email: "fravega@fravega.com",
    password: "123456",
    cuit: 1,
    razon_social: "Frávega S.A.",
    direccion: "Belgrano, 234, CABA, Buenos Aires",
    /* fecha_inicio_contrato: "01/01/1900",
    fecha_fin_contrato: "01/01/1900", */
    super_admin: false,
    active: false,
    salt: "",
  },
];

async function createClients() {
  clients[0].salt = bcrypt.genSaltSync();
  clients[1].salt = bcrypt.genSaltSync();
  return bcrypt
    .hash(clients[0].password, clients[0].salt)
    .then((hashed) => (clients[0].password = hashed))
    .then(() => bcrypt.hash(clients[1].password, clients[1].salt))
    .then((hashed) => (clients[1].password = hashed))
    .then(() =>
      Client.bulkCreate(clients).then(() => {
        console.log("CLIENTS created ok");
      })
    );
}

module.exports = createClients;
