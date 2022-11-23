import { useEffect, useState } from "react";
import Select from "react-select";

import fakeBranch from "../utils/fackeDataBranch.json";
import fakeClient from "../utils/fackeDataClient.json";
import { Axios } from "../utils/AxiosWithCredentials.js";
import { useLocation } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";

export default function DropDownSelect() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});
  // const [options, setOptions] = useState({});

  const { pathname } = useLocation();

  const fecthGuards = async () => {
    try {
      const { data } = await Axios.get("/guards/guardsbyclient/2");

      setSelect(data);
    } catch (err) {
      console.error(err, "failed get to endpoint");
    }
  };

  const fetchBranchs = async () => {
    try {
      const { data } = await Axios.get("/branches/byClient");
      console.log("data es ", data);
      setSelect(data);
    } catch (err) {
      console.error(err, "failed to get branches");
    }
  };

  useEffect(() => {
    if (pathname === "/branch") fetchBranchs();
    if (pathname === "/superadmin") setSelect(fakeClient);
    if (pathname === "/guards/2") {
      fecthGuards();
    }
  }, []);

  const options = select.map((element) => {
    if (pathname === "/branch/1") {
      return {
        label: `Sucursal Nro: ${element.name}`,
        value: element,
      };
    }

    if (pathname === "/guards/2") {
      return {
        label: `Guardia: ${element.name} ${element.lastname}`,
        value: element,
      };
    }
  });

  const handleSelect = (e) => {
    setInput(e);
  };

  return (
    <>
      <Select value={input} options={options} onChange={handleSelect} />
      <DynamicTable object={input.value} />
    </>
  );
}
