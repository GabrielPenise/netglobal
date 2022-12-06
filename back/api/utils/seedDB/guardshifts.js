const { GuardShift } = require("../../models");

const guardshifts = [
  {
    day: "Monday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Tuesday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "Wednesday",
    guardId: 1,
    shiftId: 2,
  },
  {
    day: "Thursday",
    guardId: 1,
    shiftId: 2,
  },
  {
    day: "Friday",
    guardId: 1,
    shiftId: 3,
  },
  {
    day: "Saturday",
    guardId: 1,
    shiftId: 3,
  },
  {
    day: "Monday",
    guardId: 2,
    shiftId: 3,
  },
  {
    day: "Tuesday",
    guardId: 2,
    shiftId: 3,
  },
  {
    day: "Wednesday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Thursday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "Friday",
    guardId: 2,
    shiftId: 2,
  },
  {
    day: "Saturday",
    guardId: 2,
    shiftId: 2,
  },
  {
    day: "Monday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Tuesday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "Wednesday",
    guardId: 4,
    shiftId: 3,
  },
  {
    day: "Thursday",
    guardId: 4,
    shiftId: 3,
  },
  {
    day: "Friday",
    guardId: 4,
    shiftId: 1,
  },
  {
    day: "Saturday",
    guardId: 4,
    shiftId: 1,
  },
];

async function createGuardShifts() {
  GuardShift.bulkCreate(guardshifts).then(() => {
    console.log("GUARD SHIFTS created ok");
  });
}

module.exports = createGuardShifts;
