const express = require("express");
const router = express.Router();
const Client = require("../models/Client");
const { generateToken } = require("../config/token");
const { validateAuth, validateSuperAdmin } = require("../middlewares/auth");
const ClientController = require("../controllers/client");

// REGISTER api/client/create

router.post("/create", validateSuperAdmin, ClientController.createClient);

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

//UPDATE CLIENT api/client/edit/:id
router.put("/edit/:id", ClientController.updateClient);

//UNSUSCRIBE - DELETE  api/client/delete/:id
router.delete("/delete/:id", validateSuperAdmin, ClientController.delete);

//SUSCRIBE CLIENT - RESTORE api/client/restore/:id
router.delete("/restore/:id", validateSuperAdmin, ClientController.restore);

module.exports = router;
