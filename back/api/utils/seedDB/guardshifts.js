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
];

async function createGuardShifts() {
  GuardShift.bulkCreate(guardshifts).then(() => {
    console.log("GUARD SHIFTS created ok");
  });
}

module.exports = createGuardShifts;
