import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Axios } from "../../utils/AxiosWithCredentials";
import moment from "moment";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { messages } from "../../utils/calendar-messages-es";

import CalendarioEvent from "./CalendarioEvent";
import { CalendarioModal } from "./CalendarioModal";

import { BtnAddEvent } from "../Buttons/BtnAddEvent.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  branchEvents,
  eventSetActive,
  setUiOpen,
} from "../../store/slices/index.js";

const localizer = momentLocalizer(moment);
moment.locale("es");

export default function Calendario({ branch }) {
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();
  const [fijarVista, setFijarVista] = useState(
    localStorage.getItem("fijarVista") || "month"
  );

  useEffect(() => {
    if (branch)
      Axios.get(`/events/byBranch/${branch.id}`)
        .then((res) => {
          // transformar start/end a tipo Date

          res.data.forEach((event) => {
            event.start = new Date(event.start);
            event.end = new Date(event.end);
          });
          dispatch(branchEvents(res.data));
        })
        .catch((err) => console.error(err));
  }, [branch]);

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

  const handleSelectEvent = (e) => {
    dispatch(eventSetActive(e));
    dispatch(setUiOpen(true));
  };

  // const onDoubleClickEvent = (e) => {
  //   dispatch(setUiOpen(true));
  // };

  return branch ? (
    <>
      <div style={{ height: "100vh" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccesor="start"
          endAccesor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          // onDoubleClickEvent={onDoubleClickEvent}
          onSelectEvent={handleSelectEvent}
          onView={handleOnview}
          view={fijarVista}
          components={{ event: CalendarioEvent }}
        />
        <BtnAddEvent />

        <CalendarioModal />
      </div>
    </>
  ) : (
    <div>Elija una sucursal para ver el calendario</div>
  );
}
