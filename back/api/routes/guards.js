const express = require("express");
const routerGuards = express.Router();
const { Guards } = require("../models");
const { validateAuth, validateClient } = require("../middlewares/auth");
const GuardsController = require("../controllers/guards");

//GET ALL GUARDS api/guards
routerGuards.get("/", GuardsController.getAll);

//GET GUARDS BY CLIENT api/guards/guardsbyclient/:id
routerGuards.get("/guardsbyclient/:id", GuardsController.getGuardsByClient)

//GET GUARD BY ID api/guards/:id
routerGuards.get("/:id", GuardsController.getSingle)

//CREATE GUARD api/guards/create
routerGuards.post("/create", GuardsController.createGuard)

//LOG IN GUARD api/guards/login
routerGuards.post("/login", GuardsController.loginGuard)

//PERSISTENCIA api/guards/validate
routerGuards.get("/validate", validateAuth, (req, res) => {res.send(req.user)});

//LOG OUT GUARD api/guards/logout
routerGuards.post("/logout", (req, res) => {  res.clearCookie("token") 
res.sendStatus(204)});

//UPDATE GUARD api/guards/:id
routerGuards.put("/:id", GuardsController.updateGuard)

//DELETE GUARD api/guards/deleteGuard/:id
routerGuards.delete("/deleteGuard/:id", GuardsController.deleteGuard)

module.exports = routerGuards;
