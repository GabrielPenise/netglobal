import { useEffect, useRef, useState } from "react";

import { Axios } from "../utils/AxiosWithCredentials.js";

import { useSelector } from "react-redux";
import DropDownSelect from "../commons/DropDownSelect.jsx";
import { Container } from "react-bootstrap";

export default function Guards() {
  const [select, setSelect] = useState([]);
  const [input, setInput] = useState({});
  const options = useRef([]);
  const { user } = useSelector((state) => state.user);

  const fecthGuards = async () => {
    try {
      const { data } = await Axios.get(`/guards/byclient/${user.id}`);

      setSelect(data);
    } catch (err) {
      console.error(err, "failed get to endpoint");
    }
  };

  const handleSelect = (e) => {
    setInput(e);
  };

  useEffect(() => {
    fecthGuards();
  }, []);

  options.current = select.map((element) => {
    let setTrue = null;
    element.active ? (setTrue = "Si") : (setTrue = "No");

    return {
      label: `Guardia: ${element.name} ${element.lastname} Activo: ${setTrue}`,
      value: element,
    };
  });

  const handleDelete = () => {
    Axios.put(`/guards/delete/${input.value.id}`);
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <DropDownSelect
        value={input}
        options={options.current}
        handleSelect={handleSelect}
        handleDelete={handleDelete}
      />
    </Container>
  );
}
