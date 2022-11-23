const GuardsService = require("../services/guards");
const { generateToken } = require("../config/token");
const { deleteGuard } = require("../services/guards");
const { Guards } = require("../models");

class GuardsController {
    static async getAll(req, res) {
      const { error, data } = await GuardsService.getAll();
  
      if (error) {
        return res.status(data.status || 500).send({ message: data.message });
      }
      res.send(data);
    }

    static async getGuardsByClient(req, res) {
      const {id} = req.params

      const {error, data} = await GuardsService.getGuardsByClient(id);
      if(error) {
        return res.status(data.status || 500).send({message: data.message})
      }
      res.send(data)
    }

    static async getSingle(req, res) {
      const { id } = req.params;
      const { error, data } = await GuardsService.getSingle(id);
      if (error) {
        return res.status(data.status || 500).send({ message: data.message });
      }
      if (!data) {
        return res
          .status(404)
          .send({ message: `No existe el guard con id ${id}` });
      }
      res.send(data);
    }

    static async createGuard(req, res) {
      const body = req.body
      const {error, data} = await GuardsService.createGuard(body)
      if(error) {
        return res.status(data.status || 500).send({message: data.message})
      }
      res.status(201).send(data)
    }

    static async loginGuard(req, res) {
      const body = req.body
      const {error, data} = await GuardsService.loginGuard(body)
        const payload = {
        id: data.dataValues.id,
        email: data.dataValues.email,
        rol: "guard"
      }
      const token = generateToken(payload)  
      res.cookie("token", token)
      res.send(payload) 
      if(error) {
        return res.status(data.status || 500).send({message: data.message})
        
      }
      res.status(201)
    }

  static async updateGuard(req, res) {
    const {id} = req.params
    const body = req.body
    const {error, data} = await GuardsService.updateGuard(id, body, )
    if(error) {
      return res.status(data.status || 500).send({message: data.message})
    }
    res.status(202).send("Updated correctly")
  }  

  static async deleteGuard(req, res) {
    const {id} = req.params
    const {error, data} = await GuardsService.deleteGuard(id)
    if (error) {
      return res.status(data.status || 500).send({message: data.message})
    }
    res.sendStatus(202)
  }
}



module.exports = GuardsController;