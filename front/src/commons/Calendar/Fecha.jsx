import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";

function Fecha({ handleSelect }) {
  const [date, setDate] = useState(new Date());

  const handleDateSelect = () => {};

  console.log(date);

  return (
    <div>
      <DatePicker
        className="form-control"
        selected={date}
        onChange={(date) => setDate(date)}
        onSelect={handleSelect}
      />
    </div>
  );
}

export default Fecha;
