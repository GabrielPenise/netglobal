import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setUiOpenNew, newGuard } from "../../store/slices/index.js";
import { Form, Button, Modal, Container, Col, Row } from "react-bootstrap";
import { Axios } from "../../utils/AxiosWithCredentials.js";

export default function GuardModalNew() {
  const { user } = useSelector((state) => state.user);
  const initialState = {
    name: "",
    lastname: "",
    email: "",

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

    { heading: "Cuil", key: "cuil", type: "text" },
    { heading: "Calle", key: "street", type: "text" },
    { heading: "Altura", key: "number", type: "number" },
    { heading: "Ciudad", key: "city", type: "text" },
    { heading: "Provincia", key: "province", type: "text" },
    { heading: "Codigo Postal", key: "postalcode", type: "text" },
  ];

  const closeModal = () => {
    dispatch(setUiOpenNew(false));
    setInput(initialState);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/guards/create", input);
      //Otro Endpoint con la dataDel Guardia y Campos de Shiftid
      const guard = {
        value: { ...data },
        label: `Guardia: ${data.name} ${data.lastname} Activo: Si`,
      };

      dispatch(newGuard(guard));
      setInput(initialState);
      closeModal();
    } catch (err) {
      alert("Error, Verificar los datos ingresados");
      console.error(err, "failed to create guard");
      setInput(initialState);
      closeModal();
    }
  };
  return (
    <Modal
      size="lg"
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
          <Container>
            <Row>
              <Col>
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
              </Col>
              <Col>
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
                <label className="form-label">Texto</label>
                <Form.Control />
              </Col>
            </Row>
          </Container>
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
