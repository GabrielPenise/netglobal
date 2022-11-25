import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUiOpenNew } from "../store/slices/index.js";
import { Form, Button, Modal } from "react-bootstrap";
import { Axios } from "../utils/AxiosWithCredentials.js";

export default function ClientModalNew() {
  const { user } = useSelector((state) => state.user);
  const initialState = {
    email: "",
    password: "",
    name: "",
    address: "",
    cuit: "",
    clientId: user.id,
  };
  const [input, setInput] = useState(initialState);
  const dispatch = useDispatch();
  const { uiOpenNew } = useSelector((state) => state.modalCreate);

  //Crea los nombres de los campos que necesito para crear un nuevo branch
  //heading es lo que voy a ver en el formulario, la key es el nombre de la prop de obj, y el type es para usar en el input de html
  const headingClientNew = [
    { heading: "Email", key: "email", type: "email" },
    { heading: "Password", key: "password", type: "password" },
    { heading: "Nombre", key: "name", type: "text" },

    { heading: "Calle", key: "address", type: "text" },

    { heading: "Cuit", key: "cuit", type: "text" },
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
    Axios.post("/clients/create", input);
    setInput(initialState);
    closeModal();
    window.location.reload();
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
        <Modal.Title>Nueva Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {headingClientNew.map((element, index) => {
            return (
              <div className="mb-3" key={index}>
                <label className="form-label">{element.heading}</label>
                <Form.Control
                  type={element.type}
                  value={input[element.key]}
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
