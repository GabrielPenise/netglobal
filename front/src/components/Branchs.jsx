import { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { Axios } from "../utils/AxiosWithCredentials.js";

import { useSelector } from "react-redux";
import DropDownSelect from "../commons/DropDownSelect.jsx";

export default function Branchs() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});
  const options = useRef([]);
  const { user } = useSelector((state) => state.user);

  const fetchBranchs = async () => {
    try {
      const { data } = await Axios.get(`/branches/byClient/${user.id}`);

      setSelect(data);
    } catch (err) {
      console.error(err, "failed to get branches");
    }
  };

  const handleSelect = (e) => {
    setInput(e);
  };

  useEffect(() => {
    fetchBranchs();
  }, []);

  options.current = select.map((element) => {
    return {
      label: `${element.name}`,
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
