import { useEffect, useState } from "react";
import Select from "react-select";

import { Axios } from "../utils/AxiosWithCredentials.js";
import { useLocation } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";
import { useSelector } from "react-redux";

export default function DropDownSelect() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});
  const { user } = useSelector((state) => state.user);

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
      const { data } = await Axios.get(`/branches/byClient/${user.id}`);

      setSelect(data);
    } catch (err) {
      console.error(err, "failed to get branches");
    }
  };

  const fetchClients = async () => {
    try {
      const { data } = await Axios.get("/client");

      setSelect(data);
    } catch (err) {
      console.error(err, "failed to get all clients");
    }
  };

  useEffect(() => {
    if (pathname === `/branch/${user.id}`) fetchBranchs();
    if (pathname === "/superadmin") fetchClients();
    if (pathname === "/guards/2") fecthGuards();
  }, []);

  const options = select.map((element) => {
    if (pathname === `/branch/${user.id}`) {
      return {
        label: `${element.name}`,
        value: element,
      };
    }

    if (pathname === "/guards/2") {
      return {
        label: `Guardia: ${element.name} ${element.lastname}`,
        value: element,
      };
    }

    if (pathname === "/superadmin") {
      return {
        label: `Cliente: ${element.razon_social}`,
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
      <DynamicTable object={Array(input.value)} />
    </>
  );
}
