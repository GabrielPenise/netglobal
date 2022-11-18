const express = require("express");
const { validateClient } = require("../middlewares/auth");
const { Branch, Client } = require("../models");
const router = express.Router();

// GET ALL BRANCHES
router.get("/", (req, res) => {
  Branch.findAll()
    .then((branches) => res.send(branches))
    .catch((err) => res.status(500).send(err));
});

// GET BRANCH BY ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Branch.findByPk(id)
    .then((branch) => res.send(branch))
    .catch((err) => res.status(404).send(err));
});

// GET ALL BRANCHES BY CLIENT
router.get("/byClient/:id", (req, res) => {
  const { id } = req.params;
  Client.findByPk(id)
    .then((client) =>
      !client
        ? res.sendStatus(400)
        : Branch.findAll({ where: { clientId: id } })
            .then((clientBranches) => res.send(clientBranches))
            .catch((err) => res.status(500).send(err))
    )
    .catch((err) => res.status(400).send(err));
});

// CREATE A NEW BRANCH
router.post("/", validateClient, (req, res) => {
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
router.put("/:id", validateClient, (req, res) => {
  Branch.findByPk(req.params.id)
    .then((branch) => {
      return !branch
        ? res.sendStatus(400)
        : branch
            .update(req.body)
            .then((updatedBranch) => res.status(202).send(updatedBranch))
            .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(400).send(err));
});

// DELETE A BRANCH
router.delete("/:id", validateClient, (req, res) => {
  Branch.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(202))
    .catch((err) => res.send(err));
});

module.exports = router;
