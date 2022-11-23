const express = require("express");
const router = express.Router();
const { validateAuth, validateClient } = require("../middlewares/auth");
const GuardsController = require("../controllers/guards");

//GET ALL GUARDS api/guards
router.get("/", GuardsController.getAll);

//GET GUARDS BY CLIENT api/guards/byClient/:id
router.get("/byClient/:id", validateClient, GuardsController.getGuardsByClient);

//GET GUARD BY ID api/guards/:id
router.get("/:id", validateAuth, GuardsController.getSingle);

//CREATE GUARD api/guards/create
router.post("/create", validateClient, GuardsController.createGuard);

//LOG IN GUARD api/guards/login
router.post("/login", validateClient, GuardsController.loginGuard);

//PERSISTENCIA api/guards/validate
router.get("/validate", validateAuth, (req, res) => {
  res.send(req.user);
});

//LOG OUT GUARD api/guards/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//UPDATE GUARD api/guards/:id
router.put("/:id", validateAuth, GuardsController.updateGuard);

//DELETE GUARD api/guards/deleteGuard/:id
router.delete("/delete/:id", validateClient, GuardsController.deleteGuard);

module.exports = router;
