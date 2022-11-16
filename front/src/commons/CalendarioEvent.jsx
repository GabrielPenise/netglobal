import React from "react";

export default function CalendarioEvent({ event }) {
  return (
    <div>
      <span>{event.title}</span>
      <span>{event.autor}</span>
    </div>
  );
}
