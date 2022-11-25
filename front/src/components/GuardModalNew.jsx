import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUiOpenNew } from "../store/slices/index.js";
import { Form, Button, Modal } from "react-bootstrap";
import { Axios } from "../utils/AxiosWithCredentials.js";

export default function GuardModalNew() {
  const { user } = useSelector((state) => state.user);
  const initialState = {
    name: "",
    lastname: "",
    email: "",
    password: null,
    cuit: null,
    street: "",
    number: null,
    city: "",
    province: "",
    postalcode: "",
    clientId: user.id,
  };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const { uiOpenNew } = useSelector((state) => state.modalCreate);

  const headingGuardNew = [
    { heading: "Nombre", key: "name", type: "text" },
    { heading: "Apellido", key: "lastname", type: "text" },
    { heading: "Email", key: "email", type: "email" },
    { heading: "Password", key: "password", type: "password" },
    { heading: "Cuil", key: "cuil", type: "text" },
    { heading: "Calle", key: "street", type: "text" },
    { heading: "Altura", key: "number", type: "number" },
    { heading: "Ciudad", key: "city", type: "text" },
    { heading: "Provincia", key: "province", type: "text" },
    { heading: "Codigo Postal", key: "postalcode", type: "text" },
  ];

  const closeModal = () => {
    dispatch(setUiOpenNew(false));

    //Todo: Cerrar el modal, esta fn la voy a usar al final del handleSubmit
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "number") {
      value = Number(value);
    }

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Axios.post("/guards/create", input);
      setInput(initialState);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error(err, "failed to create guard");
      closeModal();
      window.location.reload();
    }
  };
  return (
    <Modal
      size="sm"
      show={uiOpenNew}
      onHide={closeModal}
      centered
      aria-labelledby="contained-moda-tittle-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Guardia</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {headingGuardNew.map((element, index) => {
            return (
              <div className="mb-3" key={index}>
                <label className="form-label">{element.heading}</label>
                <Form.Control
                  value={input[element.key]}
                  type={element.type}
                  name={element.key}
                  onChange={handleInputChange}
                  required
                />
              </div>
            );
          })}
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
