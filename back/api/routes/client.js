const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { generateToken } = require("../config/token");
const { validateAuth, validateSuperAdmin } = require("../middlewares/auth");

// REGISTER

router.post("/register", validateSuperAdmin, (req, res, next) => {
  console.log(req.body);
  Client.create({
    email: req.body.email,
    password: req.body.password,
    cuit: req.body.cuit,
    razon_social: req.body.razon_social,
    direccion: req.body.direccion,
    // fecha_inicio_contrato: req.body.fecha_inicio_contrato,
    // fecha_fin_contrato: req.body.fecha_fin_contrato,
    super_admin: req.body.super_admin,
  })
    .then((client) => {
      res.status(201).send(client);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(200);
    });
});

// LOG IN
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  Client.findOne({ where: { email: email } })
    .then((client) => {
      if (!client) return res.sendStatus(401);

      client.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);

        const payload = {
          id: client.id,
          email: client.email,
          super_admin: client.super_admin,
          rol: "client",
        };
        const token = generateToken(payload);

        res.cookie("token", token);

        res.send(payload);
      });
    })
    .catch((err) => {
      console.error(err);
    });
});

// PERSISTENCIA
router.get("/validate", validateAuth, (req, res) => {
  res.send(req.user);
});

// LOG OUT
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//GET ALL CLIENTS
router.get("/", validateSuperAdmin, (req, res) => {
  Client.findAll()
    .then((clients) => res.send(clients))
    .catch((err) => res.status(404).send(err));
});

//GET ONE CLIENT  ------> acá debería agregar validación superAdmin?
router.get("/:id", (req, res) => {
  Client.findByPk(req.params.id)
    .then((client) => res.send(client))
    .catch((err) => res.status(404).send(err));
});

//UPDATE CLIENT
router.put("/:id", (req, res) => {
  Client.findByPk(req.params.id).then((client) => {
    return !client
      ? res.sendStatus(404)
      : client
          .update(req.body)
          .then((updateClient) => res.status(202).send(updateClient))
          .catch((err) => res.status(500).send(err));
  });
});

//DELETE CLIENT
router.delete("/:id", validateSuperAdmin, (req, res) => {
  Client.findByPk(req.params.id).then((client) => {
    return !client
      ? res.sendStatus(404)
      : client
          .destroy()
          .then(() => res.status(204))
          .catch((err) => res.status(500).send(err));
  });
});

module.exports = router;
