const express = require("express");
const router = express.Router();
const routerGuards = require("./guards");
const clientRoutes = require("./client");
const branchRoutes = require("./branches");
const shiftRoutes = require("./shifts");

router.use("/client", clientRoutes);
router.use("/guards", routerGuards);
router.use("/branches", branchRoutes);
router.use("/shifts", shiftRoutes);

module.exports = router;
