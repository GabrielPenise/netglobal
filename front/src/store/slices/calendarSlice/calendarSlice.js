import { createSlice, current } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  events: [
    {
      id: 1,
      title: "Guardia",
      start: moment().add(2, "day").toDate(),
      end: moment().add(3, "day").toDate(),
      branchId: 1,
      guardId: 1,
      nota: "Cubrir Puesto de trabajo",
      guard: {
        id: 1,
        name: "Juan Carlos",
        lastname: "Lopez",
        CUIL: 1231232,
        Provincia: "Buenos Aires",
        Localidad: "Mar del Plata",
      },
    },
  ],
  activeEvent: null,
};
export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    eventAddNew(state, action) {
      return {
        ...current(state),
        events: [...current(state).events, { ...action.payload }],
      };
    },
    eventSetActive(state, action) {
      return { ...current(state), activeEvent: action.payload };
    },
    unSetEventActive(state, action) {
      return { ...current(state), activeEvent: null };
    },
    eventUpdate(state, action) {
      return {
        ...current(state),
        events: current(state).events.map((element) =>
          element.id === action.payload.id ? action.payload : element
        ),
      };
    },
  },
});

export const { eventAddNew, eventSetActive, unSetEventActive, eventUpdate } =
  calendarSlice.actions;
