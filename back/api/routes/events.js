const express = require("express");
const router = express.Router();
const { validateClient } = require("../middlewares/auth");
const eventsController = require("../controllers/events");

// CREATE A NEW EVENT  /api/events/
router.post("/", eventsController.createEvent);

// UPDATE A EVENT /api/events/:id
router.put("/:id", validateClient, eventsController.updateEvent);

// DELETE A EVENT /api/events/:id
router.delete("/:id", validateClient, eventsController.deleteEvent);

//CHECKIN GUARD /api/events/checkin/:id
router.put("/checkin/:id", eventsController.checkIn);

//CHECKOUT GUARD /api/events/checkout/:id
router.put("/checkout/:id", eventsController.checkOut);

// GET EVENT BY ID  /api/events/:id
router.get("/:id", eventsController.getOneEvent);

// GET ALL EVENTS BY BRANCH api/events/byBranch/:id
router.get(
  "/byBranch/:branchId",
  validateClient,
  eventsController.allEventsByBranch
);

// GET ALL EVENTS BY GUARD api/events/byGuard/:id
router.get(
  "/byGuard/:guardId",
  validateClient,
  eventsController.allEventsByGuard
);

// GET EVENT BY GUARD ID AND DATE api/events/byDate/:guardId/:date
// esta ruta todavia no funciona, tengo que corregirla
router.get("/byDate/:guardId/:date", eventsController.eventByDateYGuard);

module.exports = router;
