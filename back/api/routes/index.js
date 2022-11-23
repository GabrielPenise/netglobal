const express = require("express");
const router = express.Router();
const routerGuards = require("./guards");
const clientRoutes = require("./client");

const branchesRoutes = require("./branches");
const eventsRoutes = require("./events");
const shiftRoutes = require("./shifts");
const guardShiftRoutes = require("./guardShifts");

router.use("/client", clientRoutes);
router.use("/guards", routerGuards);
router.use("/branches", branchesRoutes);
router.use("/shifts", shiftRoutes);
router.use("/guardShifts", guardShiftRoutes);
router.use("/events", eventsRoutes);

module.exports = router;
