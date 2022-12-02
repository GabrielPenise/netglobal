import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";

function Fecha({ handleSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateSelect = () => {};

  return (
    <div>
      <DatePicker
        className="form-control"
        selected={date}
        onChange={handleSelect}
        onSelect={(date) => setDate(date)}
      />
    </div>
  );
}

export default Fecha;
