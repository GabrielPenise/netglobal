const { Branch, Client } = require("../models");

class BranchesService {
  static async getAll() {
    try {
      const resp = await Branch.findAll();
      return { error: false, data: resp };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      console.log("id", id);
      const resp = await Branch.findByPk(id);
      return resp
        ? { error: false, data: resp }
        : { error: true, data: `No existe el cliente con id ${id}` };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getClientBranches(clientId) {
    try {
      const resp = await Branch.findAll({ where: { clientId } });
      return { error: false, data: resp.data };
    } catch (response) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createBranch(body) {
    try {
      const latitude = body.latitude;
      const longitude = body.longitude;
      const branch = await Branch.findOne({
        where: { latitude, longitude },
      });
      if (exist) {
        branch.data.message("Esta localización ya contiene una sucursal");
        return { error: true, data: branch.data };
      } else {
        const resp = await Branch.create(body);
        return { error: false, data: resp.data };
      }
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async updateBranch(id, body) {
    try {
      const resp = await Branch.update(body, { where: { id } });
      return { error: false, data: resp.data };
    } catch ({ response }) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async checkLocation(lat, long) {
    try {
      const resp = await Branch.findOne({
        where: { latitude, longitude },
      });
      return resp
        ? { error: true, data: "Esta localización ya contiene una sucursal" }
        : { error: false };
    } catch (response) {
      const { error } = response.data;
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = BranchesService;
