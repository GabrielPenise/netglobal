const express = require("express")
const routerGuards = express.Router()
const {Guards} = require("../models")
const Client = require("../models/Client")
const { Branch } = require("../models")

//Ruta para solicitar todos los guardias 
routerGuards.get("/", (req, res) => {
    Guards.findAll().then((vigiladores) => res.send(vigiladores))
})

//Ruta para solicitar un guardia por ID 
routerGuards.get("/:id", (req, res) => {
    Guards.findByPk(req.params.id).then((guard) => res.send(guard))
})

//Ruta para crear un guardia 
routerGuards.post("/create", (req, res) => {
    console.log(req.body);
    const { client, name, lastname, email, cuil, password, province, localidad, entry_time, hours_per_day } = req.body
    Client.findByPk(client).then((currentClient) => {
        const newGuard = { name, lastname, email, cuil, password, province, localidad, entry_time, hours_per_day }
        Guards.create(newGuard).then((addGuard) => addGuard.setBranch(currentClient))
    }).then(() => res.status(202).send("Guard added correctly"))
})



module.exports = routerGuards