const express = require("express");
const router = express.Router();
const clientRoutes = require("./client");

router.use("/client", clientRoutes);

router.get("/", (req, res) => res.send("Hola mundo"));

module.exports = router;
