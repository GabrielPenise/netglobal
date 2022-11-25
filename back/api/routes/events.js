const express = require("express");
const router = express.Router();
const { validateClient } = require("../middlewares/auth");
const eventsController = require("../controllers/events");

// CREATE A NEW EVENT  /api/events/

router.post("/", validateClient, eventsController.createEvent);

// UPDATE A EVENT /api/events/:id
router.put("/:id", validateClient, eventsController.updateEvent);

// DELETE A EVENT /api/events/:id
router.delete("/:id", validateClient, eventsController.deleteEvent);

// GET EVENT BY ID  /api/events/:id
router.get("/:id", eventsController.getOneEvent);

// GET ALL EVENTS BY BRANCH api/events/byBranch/:id
router.get("byBranch/:id", validateClient, eventsController.allEventsByBranch);

// GET ALL EVENTS BY GUARD api/events/byGuard/:id
router.get("/byGuard/:id", validateClient, eventsController.allEventsByGuard);

module.exports = router;
