const { GuardShift } = require("../../models");

const guardshifts = [
  {
    day: "monday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "tuesday",
    guardId: 1,
    shiftId: 1,
  },
  {
    day: "wednesday",
    guardId: 1,
    shiftId: 2,
  },
  {
    day: "thursday",
    guardId: 1,
    shiftId: 2,
  },
  {
    day: "friday",
    guardId: 1,
    shiftId: 3,
  },
  {
    day: "saturday",
    guardId: 1,
    shiftId: 3,
  },
  {
    day: "monday",
    guardId: 2,
    shiftId: 3,
  },
  {
    day: "tuesday",
    guardId: 2,
    shiftId: 3,
  },
  {
    day: "wednesday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "thursday",
    guardId: 2,
    shiftId: 1,
  },
  {
    day: "friday",
    guardId: 2,
    shiftId: 2,
  },
  {
    day: "saturday",
    guardId: 2,
    shiftId: 2,
  },
  {
    day: "monday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "tuesday",
    guardId: 4,
    shiftId: 2,
  },
  {
    day: "wednesday",
    guardId: 4,
    shiftId: 3,
  },
  {
    day: "thursday",
    guardId: 4,
    shiftId: 3,
  },
  {
    day: "friday",
    guardId: 4,
    shiftId: 1,
  },
  {
    day: "saturday",
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
