import React, { useEffect, useState } from "react";
import BtnDeleteEvent from "../Buttons/BtnDeleteEvent";
import moment from "moment";
import Swal from "sweetalert2";

import DateTimePicker from "react-datetime-picker";

import { Button, Modal, Form } from "react-bootstrap";

import "../../assets/styles/commons/CalendarioModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddNew,
  setUiOpen,
  unSetEventActive,
  eventUpdate,
} from "../../store/slices/index.js";

const startDate = moment().minutes(0).seconds(0).add(1, "hours");
const endDate = startDate.clone().add(8, "hours");
const initialState = {
  title: "",
  start: startDate.toDate(),
  end: endDate.toDate(),
  notes: "",
};

export const CalendarioModal = () => {
  const dispatch = useDispatch();
  const { uiOpen } = useSelector((state) => state.modal);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(startDate.toDate());
  const [dateEnd, setDateEnd] = useState(endDate.toDate());
  const [formData, setFormData] = useState(initialState);

  const closeModal = () => {
    dispatch(setUiOpen(false));
    setFormData(initialState);
    dispatch(unSetEventActive());
    //Todo: Cerrar el modal, esta fn la voy a usar al final del handleSubmit
  };
  const handleInputChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const validateDates = (start, end) => {
    const momentStartDate = moment(start);
    const momentEndDate = moment(end);

    if (momentStartDate.isSameOrAfter(momentEndDate)) {
      //Fecha de inicio no puede ser Igual o Menor que la de finalizacion.
      Swal.fire("Error", "La fecha fin debe ser mayor a la de inicio", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar fecha e inputs
    validateDates(formData.start, formData.end);

    if (activeEvent) {
      dispatch(eventUpdate(formData));
    } else {
      dispatch(eventAddNew({ ...formData }));
    }

    closeModal();
  };

  const handleDateStart = (e) => {
    setDateStart(e);
    setFormData({
      ...formData,
      start: e,
    });
  };

  const handleDateEnd = (e) => {
    setDateEnd(e);
    setFormData({
      ...formData,
      end: e,
    });
  };

  useEffect(() => {
    if (activeEvent) {
      setFormData(activeEvent);
    }
  }, [activeEvent]);

  return (
    <Modal
      size="sm"
      show={uiOpen}
      onHide={closeModal}
      centered
      aria-labelledby="contained-moda-tittle-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Turno</label>
            <Form.Control
              type="text"
              value={formData.title}
              name="title"
              placeholder="Turno de..."
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha Hora Inicio Jornada</label>
            <DateTimePicker
              className="form-control"
              minDate={startDate.toDate()}
              onChange={handleDateStart}
              value={dateStart}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha y Hora Fin de Jornada </label>
            <DateTimePicker
              className="form-control"
              minDate={dateStart}
              onChange={handleDateEnd}
              value={dateEnd}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="notas"
              rows="5"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          {/* <div className="mb-3">
            <label className="form-label">Label</label> */}
          {/* <Form.Control
                  type={element.type}
                  value={input[element.key]}
                  name={element.key}
                  onChange={handleInputChange}
                  required
                /> */}
          {/* </div> */}

          <Modal.Footer>
            {activeEvent && <BtnDeleteEvent />}
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

  // return (
  //   <>
  //     <Modal
  //       isOpen={uiOpen}
  //       onRequestClose={closeModal}
  //       style={customStyles}
  //       closeTimeoutMS={200}
  //       overlayClassName="modal-fondo"
  //     >
  //       <form>
  //         <div className="mb-3">
  //           <label className="form-label">Fecha</label>
  //           <DateTimePicker
  //             className="form-control"
  //             minDate={date}
  //             onChange={handleDate}
  //             value={date}
  //           />
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Turno</label>
  //           <select className="form-select">
  //             <option value={"Turno Mañana"}>Mañana</option>
  //             <option value={"Turno Tarde"}>Tarde</option>
  //             <option value={"Turno Noche"}>Noche</option>
  //           </select>
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Estado</label>
  //           <select className="form-select">
  //             <option value={"Cancelado"}>Cancelado</option>
  //             <option value={"pendiente"}>Pendiente</option>
  //             <option value={"Confirmado"}>Confirmado</option>
  //           </select>
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Vigilador</label>
  //           <select className="form-select">
  //             {/* aca tengo que mapear los vigiladores  */}

  //             <option value={"Vigilador 1"}>Juan</option>
  //             <option value={"Vigilador 2"}>Carlos</option>
  //             <option value={"Vigilador 3"}>Pablo</option>
  //           </select>
  //         </div>
  //         <div className="mb-3">
  //           <label className="form-label">Notas:</label>
  //           <textarea className="form-control" rows={5} placeholder="Notas.." />
  //         </div>
  //         <Button>Guardar</Button>
  //       </form>
  //     </Modal>
  //   </>
  // );
};
