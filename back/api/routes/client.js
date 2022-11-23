const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { generateToken } = require("../config/token");
const { validateAuth, validateSuperAdmin } = require("../middlewares/auth");
const ClientController = require("../controllers/client");

// REGISTER api/client/register

router.post("/register", validateSuperAdmin, ClientController.createClient);

// LOG IN api/client/login
router.post("/login", ClientController.loginClient);

// PERSISTENCIA  api/client/validate
router.get("/validate", validateAuth, (req, res) => {
  res.send(req.user);
});

// LOG OUT api/client/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//GET ALL CLIENTS  api/client/
router.get("/", validateSuperAdmin, ClientController.allClients);

//GET ONE CLIENT api/client/:id ------> acá debería agregar validación superAdmin?
router.get("/:id", ClientController.getOneClient);

//UPDATE CLIENT api/client/:id
router.put("/:id", ClientController.updateClient);

// ACTIVE - INACTIVE  api/client/active/:id
router.put("/active/:id", ClientController.updateActive);

// //DELETE CLIENT
// router.delete("/:id", validateSuperAdmin, (req, res) => {
//   Client.findByPk(req.params.id).then((client) => {
//     return !client
//       ? res.sendStatus(404)
//       : client
//           .destroy()
//           .then(() => res.status(204))
//           .catch((err) => res.status(500).send(err));
//   });
// });

module.exports = router;
