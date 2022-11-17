const BranchesService = require("../services/branches");

class BranchesController {
  static async getAll(req, res) {
    const { error, data } = await BranchesService.getAll();

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async getSingle(req, res) {
    const { id } = req.params;

    const { error, data } = await BranchesService.getSingle(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.send(data);
  }

  static async getClientBranches(req, res) {
    const { id } = req.params;

    /* const { errorGet, dataGet } = await ClientService.getSingle(id);

    if (errorGet) {
      return res
        .status(dataGet.status || 500)
        .send({ message: dataGet.message });
    } */

    const { error, data } = await BranchesService.getClientBranches(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.send(data);
  }

  static async createBranch(req, res) {
    const { latitude, longitude } = req.body;

    const { errorCheck, dataCheck } = await BranchesService.checkLocation(
      latitude,
      longitude
    );

    if (errorCheck) {
      return res.status(400).send(dataCheck);
    }

    const body = req.body;

    const { error, data } = await BranchesService.createBranch(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(201).send(data);
  }

  static async updateBranch(req, res) {
    const { id } = req.params;

    const { errorGet, dataGet } = await BranchesService.getSingle(id);

    if (errorGet) {
      return res
        .status(dataGet.status || 500)
        .send({ message: dataGet.message });
    }

    const body = req.body;

    const { error, data } = await BranchesService.updateBranch(id, body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    res.status(202).send(data);
  }
}

module.exports = BranchesController;
