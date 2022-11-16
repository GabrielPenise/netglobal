const express = require("express");
const { Branch, Client } = require("./models");
const router = express.Router();

// GET ALL BRANCHES
router.get("/", (req, res) => {
  Branch.findAll()
    .then((branches) => res.send(branches))
    .catch((err) => res.status(500).send(err));
});

// GET BRANCH BY ID
router.get("/:id", (req, res) => {
  Branch.findByPk({ where: { id: req.params.id } })
    .then((branch) => res.send(branch))
    .catch((err) => res.status(404).send(err));
});

// GET ALL BRANCHES BY CLIENT
router.get("/clientBranches/:id", (req, res) => {
  Client.findByPk({
    where: { id: req.params.id },
  })
    .then((branch) =>
      branch
        ? res.sendStatus(400)
        : Branch.create(req.body)
            .then((newBranch) => res.status(201).send(newBranch))
            .catch((err) => res.status(500).send(err))
    )
    .catch((err) => res.status(400).send(err));
});

// CREATE A NEW BRANCH
router.post("/", (req, res) => {
  // Control if any existing branch matches location
  Branch.findOne({
    where: { latitude: req.body.latitude, longitude: req.body.longitude },
  })
    .then((branch) =>
      branch
        ? res.sendStatus(400)
        : Branch.create(req.body)
            .then((newBranch) => res.status(201).send(newBranch))
            .catch((err) => res.status(500).send(err))
    )
    .catch((err) => res.status(400).send(err));
});

// UPDATE A BRANCH
router.put("/:id", (req, res) => {
  Branch.findByPk({ where: { id: req.params.id } })
    .then((branch) =>
      !branch
        ? res.sendStatus(400)
        : branch
            .update(req.body)
            .then((updatedBranch) => res.status().send(updatedBranch))
            .catch((err) => res.status(500).send(err))
    )
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
