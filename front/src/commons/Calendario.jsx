import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../utils/calendar-messages-es";

import CalendarioEvent from "./CalendarioEvent";
import { CalendarioModal } from "./CalendarioModal";

import { fakeDataEvent } from "../utils/fakeDataEvent";
import { BtnAddEvent } from "./BtnAddEvent";

const localizer = momentLocalizer(moment);
moment.locale("es");
const myEventList = [
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
  {
    title: "Chau",
    start: moment().add(1, "day").toDate(),
    end: moment().add(2, "day").toDate(),
    autor: "Trabajo Juan",
    notes: "Nota descriptiva",
  },
];

export default function Calendario() {
  const [fijarVista, setFijarVista] = useState(
    localStorage.getItem("fijarVista") || "month"
  );

  const handleOnview = (e) => {
    setFijarVista(e);
    localStorage.setItem("fijarVista", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#246eb9",
      opacity: 0.8,
      display: "block",
      color: "white",
    };
    return {
      style,
    };
  };

  return (
    <>
      <div style={{ height: "100vh" }}>
        <Calendar
          localizer={localizer}
          events={fakeDataEvent}
          startAccesor="start"
          endAccesor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          // onDoubleClickEvent={() => setUiOpen(true)}
          onSelectEvent={(e) => console.log(e)}
          onView={handleOnview}
          view={fijarVista}
          components={{ event: CalendarioEvent }}
        />
        <BtnAddEvent />
        <CalendarioModal />
      </div>
    </>
  );
}
