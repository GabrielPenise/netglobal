import { useEffect, useRef, useState } from "react";

import { Axios } from "../utils/AxiosWithCredentials.js";

import { useSelector, useDispatch } from "react-redux";
import DropDownSelect from "../commons/DropDownSelect.jsx";
import BranchModal from "./BranchModal.jsx";
import { setUiOpen } from "../store/slices/index.js";
import { Container } from "react-bootstrap";

export default function Branchs() {
  const dispatch = useDispatch();
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

  const handleDelete = () => {
    Axios.delete(`/${input.value.id}`);
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

      <BranchModal branch={input} />
    </Container>
  );
}
