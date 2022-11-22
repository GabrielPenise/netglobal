const { Shift } = require("../models");

const shifts = [
  {
    type: "morning",
    start: "08:00",
    end: "16:00",
  },
  {
    type: "afternoon",
    start: "16:00",
    end: "00:00",
  },
  {
    type: "nightmorning",
    start: "00:00",
    end: "08:00",
  },
];

async function createShifts() {
  Shift.bulkcreate(shifts).then(() => {
    console.log("SHIFTS created ok");
  });
}

module.exports = createShifts;
