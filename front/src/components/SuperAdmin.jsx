import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setUiOpen } from "../store/slices/index.js";

import { Axios } from "../utils/AxiosWithCredentials.js";

import DropDownSelect from "../commons/DropDownSelect.jsx";
import ClientModal from "./ClientModal.jsx";
import { Container } from "react-bootstrap";

export default function SuperAdmin() {
  const dispatch = useDispatch();
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
      label: `${element.name}`,
      value: element,
    };
  });

  const handleDelete = () => {
    Axios.delete(`/client/delete/${input.value.id}`);
  };

  const handleModify = () => {
    dispatch(setUiOpen(true));
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <DropDownSelect
        value={input}
        options={options.current}
        handleSelect={handleSelect}
        handleDelete={handleDelete}
        handleModify={handleModify}
      />
      <ClientModal client={input} />
    </Container>
  );
}
