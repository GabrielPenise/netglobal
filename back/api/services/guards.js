const { Guard } = require("../models");

class GuardsService {
  static async getAll() {
    try {
      const response = await Guard.findAll({
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getGuardsByClient(clientId) {
    try {
      const response = await Guard.findAll({
        where: { clientId },
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async getSingle(id) {
    try {
      const response = await Guard.findByPk(id, {
        attributes: { exclude: ["password", "salt"] },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async createGuard(body) {
    try {
      const response = await Guard.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async loginGuard(email, password) {
    try {
      const guard = await Guard.findOne({ where: { email } });
      if (!guard)
        return {
          error: true,
          data: {
            status: 400,
            message: `No existe el guardia con email ${email}`,
          },
        };
      const validate = await guard.validatePassword(password);
      if (!validate)
        return {
          error: true,
          data: {
            status: 400,
            message: `Contraseña incorrecta`,
          },
        };
      const payload = {
        id: guard.id,
        email: guard.email,
        rol: "guard",
      };
      return { error: false, data: payload };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async updateGuard(id, body) {
    try {
      const resp = await Guard.findByPk(id);
      if (!resp) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el guardia con id ${id}`,
          },
        };
      }
      const [affectedRows, updatedGuard] = await Guard.update(body, {
        where: { id },
        returning: true,
      });
      return { error: false, data: updatedGuard[0] };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }

  static async deleteGuard(id) {
    try {
      const resp = await Guard.findByPk(id);
      if (!resp) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el guardia con el id ${id}`,
          },
        };
      }
      const body = { active: false };
      const response = await Guard.update(body, { where: { id } });
      return { error: false, data: response };
    } catch (error) {
      console.log(error);
      return { error: true, data: error };
    }
  }
}

module.exports = GuardsService;
