import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Axios } from "../../utils/AxiosWithCredentials";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../utils/calendar-messages-es";

import CalendarioEvent from "./CalendarioEvent";
import { CalendarioModal } from "./CalendarioModal";

import { fakeDataEvent } from "../../utils/fakeDataEvent";
import { BtnAddEvent } from "../Buttons/BtnAddEvent.jsx";

const localizer = momentLocalizer(moment);
moment.locale("es");

export default function Calendario() {
  const [fijarVista, setFijarVista] = useState(
    localStorage.getItem("fijarVista") || "month"
  );

  const [events, setEvents] = useState([]);

  useEffect(() => {
    Axios.get("/events/byClient/4")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(error));
  }, []);
  console.log(events);
  console.log(fakeDataEvent);

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
          events={events}
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
