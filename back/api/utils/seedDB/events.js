const { Event } = require("../../models");

const events = [
  {
    date: "2022-11-28",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2022-11-29",
    guardId: 1,
    shiftId: 1,
    branchId: 1,
  },
  {
    date: "2022-11-30",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2022-12-01",
    guardId: 1,
    shiftId: 2,
    branchId: 1,
  },
  {
    date: "2022-12-02",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2022-12-03",
    guardId: 1,
    shiftId: 3,
    branchId: 1,
  },
  {
    date: "2022-11-28",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2022-11-29",
    guardId: 2,
    shiftId: 2,
    branchId: 2,
  },
  {
    date: "2022-11-30",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2022-12-01",
    guardId: 2,
    shiftId: 3,
    branchId: 2,
  },
  {
    date: "2022-12-02",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2022-12-03",
    guardId: 2,
    shiftId: 1,
    branchId: 2,
  },
  {
    date: "2022-11-28",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2022-11-29",
    guardId: 4,
    shiftId: 3,
    branchId: 5,
  },
  {
    date: "2022-11-30",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2022-12-01",
    guardId: 4,
    shiftId: 1,
    branchId: 5,
  },
  {
    date: "2022-12-02",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
  {
    date: "2022-12-03",
    guardId: 4,
    shiftId: 2,
    branchId: 5,
  },
];

async function createEvents() {
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    await Event.create(event);
  }
  console.log("EVENTS created ok");
}

module.exports = createEvents;
