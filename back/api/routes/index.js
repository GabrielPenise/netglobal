const express = require("express");
const router = express.Router();
const routerGuards = require("./guards")
const clientRoutes = require("./client");
router.use("/client", clientRoutes);


router.get("/", (req, res) => res.send("Hola mundo"));

router.use("/guards", routerGuards)


module.exports = router;
