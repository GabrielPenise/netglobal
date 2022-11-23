const { Events } = require("../models");

class eventsService {
  // CREATE EVENT
  static async createEvent(body) {
    try {
      const response = await Events.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UPDATE A EVENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  static async updateEvent(id, body) {
    try {
      // comprobamos si existe el evento
      const evento = await Events.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // actualizamos el evento CHEQUEAR CON ALBERT!!!
      const nuevaData = await Events.update(body, {
        where: { id },
        returning: true, //para que devuelva algo el update
      });
      return { error: false, data: nuevaData }; // esto de updatedPage no lo entiendo!!!
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // DELETE A EVENT
  static async deleteEvent(id) {
    try {
      // comprobamos si existe el evento
      const evento = await Events.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // eliminamos el evento
      const response = await Events.destroy({
        where: { id },
      });
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET EVENT BY ID

  static async getOneEvent(id) {
    try {
      const evento = await Events.findByPk(id);
      return { error: false, data: evento };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL EVENTS BY BRANCH

  static async allEventsByBranch(branchId) {
    try {
      const eventos = await Events.findAll({
        where: { branchId },
      });
      return { error: false, data: eventos };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL EVENTS BY GUARD

  static async allEventsByGuard(guardId) {
    try {
      const eventos = await Events.findAll({ where: { guardId } });
      return { error: false, data: eventos };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = eventsService;
