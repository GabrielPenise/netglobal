const { Shift } = require("../../models");

const shifts = [
  {
    type: "Mañana",
    start: "08:00:00",
    end: "16:00:00",
  },
  {
    type: "Tarde",
    start: "16:00:00",
    end: "00:00:00",
  },
  {
    type: "Noche",
    start: "00:00:00",
    end: "08:00:00",
  },
];

async function createShifts() {
  Shift.bulkCreate(shifts).then(() => {
    console.log("SHIFTS created ok");
  });
}

module.exports = createShifts;
