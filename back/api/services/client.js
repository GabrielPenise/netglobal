const { Client } = require("../models");

class ClientService {
  // CREATE CLIENT - REGISTER

  static async createClient(body) {
    try {
      const response = await Client.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // LOG IN
  static async loginClient(email, password) {
    try {
      const cliente = await Client.findOne({ where: { email: email } });
      if (!cliente) return { error: true, data: error };

      const validate = await cliente.validatePassword(password);
      if (!validate) return { error: true, data: error };
      return { error: false, data: cliente };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL CLIENTS
  static async allClients() {
    try {
      const response = await Client.findAll({
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ONE CLIENT BY ID
  static async getOneClient(id) {
    try {
      const cliente = await Client.findByPk(id, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: cliente };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UPDATE CLIENT
  static async updateClient(id, body) {
    try {
      const cliente = await Client.findByPk(id);
      if (!cliente) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el cliente ${id}`,
          },
        };
      }

      // actualizamos el cliente
      const [affectedRows, updatedClient] = await Client.update(body, {
        where: { id },
        returning: true, //para que devuelva algo el update
      });
      return { error: false, data: updatedClient[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}
module.exports = ClientService;
