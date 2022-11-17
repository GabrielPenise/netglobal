const express = require("express");
const router = express.Router();
const routerGuards = require("./guards")

router.get("/", (req, res) => res.send("Hola mundo"));

router.use("/guards", routerGuards)


module.exports = router;
