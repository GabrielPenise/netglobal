import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../utils/calendar-messages-es";

import CalendarioEvent from "./CalendarioEvent";
import { CalendarioModal } from "./CalendarioModal";

const localizer = momentLocalizer(moment);
moment.locale("es");
const myEventList = [
  {
    title: "Saludo",
    start: moment().toDate(),
    end: moment().add(2, "hours").toDate(),
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
    <div style={{ height: "100vh" }}>
      <Calendar
        localizer={localizer}
        events={myEventList}
        startAccesor="start"
        endAccesor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={() => console.log("Abro el modal")}
        onSelectEvent={(e) => console.log(e)}
        onView={handleOnview}
        view={fijarVista}
        components={{ event: CalendarioEvent }}
      />
      <CalendarioModal />
    </div>
  );
}
