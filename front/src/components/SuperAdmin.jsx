import { useEffect, useRef, useState } from "react";

import { Axios } from "../utils/AxiosWithCredentials.js";

import DropDownSelect from "../commons/DropDownSelect.jsx";

export default function SuperAdmin() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});
  const options = useRef([]);

  const fetchClients = async () => {
    try {
      const { data } = await Axios.get("/clients");

      setSelect(data);
    } catch (err) {
      console.error(err, "failed to get all clients");
    }
  };

  const handleSelect = (e) => {
    setInput(e);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  options.current = select.map((element) => {
    return {
      label: `${element.razon_social}`,
      value: element,
    };
  });

  return (
    <DropDownSelect
      value={input}
      options={options.current}
      handleSelect={handleSelect}
    />
  );
}
