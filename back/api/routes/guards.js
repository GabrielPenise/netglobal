const express = require("express");
const routerGuards = express.Router();
const { Guards } = require("../models");
const Client = require("../models/Client");
const { Branch } = require("../models");
const { generateToken } = require("../config/token");
const { validateAuth } = require("../middlewares/auth");

//GET ALL GUARDS
routerGuards.get("/", (req, res) => {
  Guards.findAll().then((vigiladores) => res.send(vigiladores));
});

//GET GUARDS BY CLIENT
routerGuards.get("/guardsbyclient/:id", (req, res) => {
    console.log(req.params.id);
    Guards.findAll({where: {clientId: req.params.id}}).then((vigiladores) => res.send(vigiladores));
  });

//GET GUARD BY ID
routerGuards.get("/:id", (req, res) => {
  Guards.findByPk(req.params.id).then((guard) => res.send(guard));
});

//CREATE GUARD
routerGuards.post("/create", (req, res) => {
  const {client,name,lastname,email,cuil,password,province,localidad,entry_time,hours_per_day,} = req.body;
  Client.findByPk(client).then((currentClient) => {
      const newGuard = {name,lastname,email,cuil,password,province,localidad,entry_time,hours_per_day};
      Guards.create(newGuard).then((addGuard) =>
        addGuard.setClient(currentClient)
      );
    })
    .then(() => res.status(202).send("Guard added correctly"));
});

//LOG IN GUARD
routerGuards.post("/login", (req, res, next) => {
    const { email, password } = req.body;
    Guards.findOne({ where: { email: email } })
      .then((guard) => {
        if (!guard) return res.sendStatus(401);
          guard.validatePassword(password).then((isValid) => {
          if (!isValid) return res.sendStatus(401);
            const payload = {
            id: guard.id,
            email: guard.email,
            rol: "guard"
          };
          const token = generateToken(payload);
            res.cookie("token", token);
            res.send(payload);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });

//PERSISTENCIA
routerGuards.get("/validate", validateAuth, (req, res) => {
    res.send(req.user);
  });
  
//LOG OUT GUARD
  routerGuards.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.sendStatus(204);
  });


//UPDATE GUARD
routerGuards.put("/:id", (req, res) => {
  const id = req.params.id 
  Guards.update(req.body, {
    where: {id},
    returning: true,
    plain: true,
  }).then((result) => {
    let obj = {
      updateGuard: result[1]
    }
    res.send(obj)
  })
})  

//DELETE GUARD
routerGuards.delete("/deleteGuard/:id", (req, res) => {
  const id = req.params.id;
  Guards.destroy({ where: { id: id } })
    .then(() => res.status(202).send("Guard deleted"))
    .catch((err) => console.log(err));
});

module.exports = routerGuards;
