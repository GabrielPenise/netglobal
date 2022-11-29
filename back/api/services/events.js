const {
  Event,
  Client,
  Branch,
  Guard,
  Shift,
  GuardShift,
} = require("../models");

class EventsService {
  // CREATE EVENT
  static async createEvent(body) {
    try {
      const response = await Event.create(body);
      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // UPDATE A EVENT

  static async updateEvent(id, body) {
    try {
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // update the event
      const [affectedRows, updatedEvent] = await Event.update(body, {
        where: { id },
        returning: true, //para que devuelva algo el update
      });
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // CHECKIN GUARD

  static async checkIn(id, body) {
    try {
      const { time_in, position_in_latitude, position_in_longitude } = body;
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // update the event

      const [affectedRows, updatedEvent] = await Event.update(
        { time_in, position_in_latitude, position_in_longitude },
        {
          where: { id },
          returning: true, //para que devuelva algo el update
        }
      );
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // CHECKOUT GUARD

  static async checkOut(id, body) {
    try {
      const { time_out, position_out_latitude, position_out_longitude } = body;
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // update the event

      const [affectedRows, updatedEvent] = await Event.update(
        { time_out, position_out_latitude, position_out_longitude },
        {
          where: { id },
          returning: true, //para que devuelva algo el update
        }
      );
      return { error: false, data: updatedEvent[0] };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // DELETE A EVENT
  static async deleteEvent(id) {
    try {
      // check if the event exists
      const evento = await Event.findByPk(id);

      if (!evento) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe el evento ${id}`,
          },
        };
      }

      // delete the event
      const response = await Event.destroy({
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
      const evento = await Event.findByPk(id);
      return { error: false, data: evento };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  // GET ALL EVENTS BY BRANCH

  static async allEventsByBranch(branchId) {
    try {
      const eventos = await Event.findAll({
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
      const eventos = await Event.findAll({ where: { guardId } });
      return { error: false, data: eventos };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  //GET EVENT BY GUARD ID AND DATE
  static async eventByDateYGuard(guardId, date) {
    try {
      const eventos = await Event.findAll({ where: { guardId, date } });
      return { error: false, data: eventos };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }

  static async eventsByClient(clientId) {
    try {
      // comprobamos que el cliente existe
      const client = await Client.findByPk(clientId);

      if (!client) {
        return {
          error: true,
          data: {
            status: 405,
            message: `No existe cliente con id ${clientId}`,
          },
        };
      }

      // traemos las sucursales del cliente
      const response = await Event.findAll({
        include: [
          { model: Branch, as: "branch", where: { clientId } },
          { model: Guard, as: "guard" },
          { model: Shift, as: "shift" },
        ],
      });

      return { error: false, data: response };
    } catch (error) {
      console.error(error);
      return { error: true, data: error };
    }
  }
}

module.exports = EventsService;
