import { useEffect, useState } from "react";
import Select from "react-select";

import fakeBranch from "../utils/fackeDataBranch.json";
import fakeClient from "../utils/fackeDataClient.json";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

export default function DropDownSelect() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/sucursales") setSelect(fakeBranch);
    if (pathname === "/superadmin") setSelect(fakeClient);
    if (pathname === "/guards") return;
  }, []);

  const options = select.map((element) => {
    return {
      label: `Sucursal Nro: ${element.number}`,
      value: element.id,
    };
  });

  const handleSelect = (e) => {
    setInput(e);
  };
  return (
    <>
      <Select value={input} options={options} onChange={handleSelect} />
    </>
  );
}
