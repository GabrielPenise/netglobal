const eventsService = require("../services/events");

class eventsController {
  // CREATE EVENT
  static async createEvent(req, res) {
    const body = req.body;

    const { error, data } = await eventsService.createEvent(body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(201).send(data);
  }

  // UPDATE A EVENT
  static async updateEvent(req, res) {
    const { id } = req.params;
    const body = req.body;

    const { error, data } = await eventsService.updateEvent(id, body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }

  // DELETE A EVENT

  static async deleteEvent(req, res) {
    const { id } = req.params;

    const { error, data } = await eventsService.deleteEvent(id, body);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    res.status(202).send(data);
  }

  // GET EVENT BY ID
  static async getOneEvent(req, res) {
    const { id } = req.params;

    const { error, data } = await eventsService.getOneEvent(id);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }
    // ACÁ NO ES !ID EN VEZ DE !DATA?????????????????????????????????????????????????????????????????
    if (!data) {
      return res.status(404).send({ message: `No existe el evento ${id}` });
    }
    res.send(data);
  }

  // GET ALL EVENTS BY BRANCH

  static async allEventsByBranch(req, res) {
    const branchId = req.params.branchId;

    const { error, data } = await eventsService.allEventsByBranch(branchId);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe la sucursal con id ${branchId}` });
    }
    res.send(data);
  }

  // GET ALL EVENTS BY GUARD

  static async allEventsByGuard(req, res) {
    const guardId = req.params.guardId;

    const { error, data } = await eventsService.allEventsByGuard(guardId);

    if (error) {
      return res.status(data.status || 500).send({ message: data.message });
    }

    if (!data) {
      return res
        .status(404)
        .send({ message: `No existe el guardia con id ${guardId}` });
    }
    res.send(data);
  }
}

module.exports = eventsController;
