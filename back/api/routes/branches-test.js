const express = require("express");
const BranchesController = require("../controllers/branches");
const router = express.Router();

// GET ALL BRANCHES
router.get("/", BranchesController.getAll);

// GET BRANCH BY ID
router.get("/:id", BranchesController.getSingle);

// GET ALL BRANCHES BY CLIENT
router.get("/byClient/:id", BranchesController.getClientBranches);

// CREATE A NEW BRANCH
router.post("/", BranchesController.createBranch);

// UPDATE A BRANCH
router.put("/:id", BranchesController.updateBranch);

module.exports = router;
