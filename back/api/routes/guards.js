const express = require("express")
const routerGuards = express.Router()
const {Guards} = require("../models")
const { Client } = require("../models")

//Ruta para solicitar todos los guardias 
routerGuards.get("/", (req, res) => {
    Guards.findAll().then((vigiladores) => res.send(vigiladores))
})

//Ruta para solicitar un guardia por ID 
routerGuards.get("/:id", (req, res) => {
    Guards.findByPk(req.params.id).then((guard) => res.send(guard))
})

routerGuards.post("/create", (req, res) => {
    const { client } = req.body
    Client.findByPk(client).then((currentClient) => {
        const newGuard = { name, lastname, cuil, province, localidad, entry_time, hours_per_day }
        Guards.create(newGuard).then((addGuard) => addGuard.setClient(currentClient))
    }).then(() => res.status(202).send("Guards added correctly"))
})



module.exports = routerGuards