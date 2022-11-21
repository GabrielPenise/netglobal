const express = require("express");
const BranchesController = require("../controllers/branches");
const { validateClient } = require("../middlewares/auth");
const router = express.Router();

// GET ALL BRANCHES /api/branches
router.get("/", BranchesController.getAll);

// GET BRANCH BY ID /api/branches/:id
router.get("/:id", BranchesController.getSingle);

// GET ALL BRANCHES BY CLIENT /api/branches/byClient/:id
router.get(
  "/byClient/:id",
  validateClient,
  BranchesController.getClientBranches
);

// CREATE A NEW BRANCH /api/branches
router.post("/", validateClient, BranchesController.createBranch);

// UPDATE A BRANCH /api/branches/:id
router.put("/:id", validateClient, BranchesController.updateBranch);

// DELETE A BRANCH /api/branches/:id
router.delete("/:id", validateClient, BranchesController.deleteBranch);

module.exports = router;
