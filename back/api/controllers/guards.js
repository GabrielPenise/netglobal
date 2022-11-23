const GuardsService = require("../services/guards");
const { generateToken } = require("../config/token");

class GuardsController {
  static async getAll(req, res) {
    const { error, data } = await GuardsService.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getGuardsByClient(req, res) {
    const { id } = req.params;

    const { error, data } = await GuardsService.getGuardsByClient(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
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
    const body = req.body;
    const { error, data } = await GuardsService.createGuard(body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  static async loginGuard(req, res) {
    const { email, password } = req.body;
    const { error, data } = await GuardsService.loginGuard(email, password);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    const token = generateToken(data);
    res.cookie("token", token);
    res.send(data);
  }

  static async updateGuard(req, res) {
    const { id } = req.params;
    const body = req.body;
    const { error, data } = await GuardsService.updateGuard(id, body);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Actualizado correctamente");
  }

  static async deleteGuard(req, res) {
    const { id } = req.params;
    const { error, data } = await GuardsService.deleteGuard(id);
    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send("Eliminado correctamente");
  }
}

module.exports = GuardsController;
