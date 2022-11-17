const express = require("express");
const router = express.Router();
const routerGuards = require("./guards");
const clientRoutes = require("./client");
const branchesRoutes = require("./branches");

router.use("/client", clientRoutes);
router.use("/guards", routerGuards);
router.use("/branches", branchesRoutes);

module.exports = router;
