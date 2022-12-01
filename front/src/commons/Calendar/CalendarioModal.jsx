import React, { useEffect, useState } from "react";
import BtnDeleteEvent from "../Buttons/BtnDeleteEvent";
import moment from "moment";
import Swal from "sweetalert2";
import Fecha from "./Fecha";

import DateTimePicker from "react-datetime-picker";

import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";

import "../../assets/styles/commons/CalendarioModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddNew,
  setUiOpen,
  unSetEventActive,
  eventUpdate,
} from "../../store/slices/index.js";

import DropDownModalGuards from "../DropDown/DropDownModalGuards";
import axios from "axios";

const startDate = moment().minutes(0).seconds(0).add(1, "hours");
const endDate = startDate.clone().add(8, "hours");
const initialState = {
  title: "",
  start: startDate.toDate(),
  end: endDate.toDate(),
  notes: "",
  guardId: null,
  branchId: null,
};

export const CalendarioModal = ({ branch }) => {
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
  const handleGuardChange = (e) => {
    setFormData({
      ...formData,
      title: e.label,
      guardId: e.value.id,
    });
  };

  const handleDateChange = (e) => {
    const date = moment(e).format("YYYY-MM-DD");
    setFormData({
      ...formData,
      date: date,
    });
  };

  const validateDates = (start, end) => {
    const momentStartDate = moment(start);
    const momentEndDate = moment(end);

    if (momentStartDate.isSameOrAfter(momentEndDate)) {
      //Fecha de inicio no puede ser Igual o Menor que la de finalizacion.
      return Swal.fire(
        "Error",
        "La fecha fin debe ser mayor a la de inicio",
        "error"
      );
    }

    if (formData.title.length === 0) {
      //Fecha de inicio no puede ser Igual o Menor que la de finalizacion.
      return Swal.fire("Error", "Tiene que asignar un guardia", "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Validar fecha e inputs
    const error = validateDates(formData.start, formData.end);
    if (error) return;

    if (activeEvent) {
      //endpoint para updatear evento
      dispatch(eventUpdate(formData));
    } else {
      //endpoint para crear evento
      axios.post("ruta", { ...formData, branchId: branch.id });
      dispatch(eventAddNew({ ...formData, branchId: branch.id }));
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
        <Modal.Title>Nueva Jornada</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label className="form-label">
            <Fecha handleSelect={handleDateChange} />
          </label>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <DropDownModalGuards handleSelect={handleGuardChange} />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Fecha Hora Inicio Jornada</label>
            <DateTimePicker
              className="form-control"
              minDate={startDate.toDate()}
              onChange={handleDateStart}
              value={dateStart}
              required
            />
          </div> */}
          {/* <div className="mb-3">
            <label className="form-label">Fecha y Hora Fin de Jornada </label>
            <DateTimePicker
              className="form-control"
              minDate={dateStart}
              onChange={handleDateEnd}
              value={dateEnd}
              required
            />
          </div> */}

          <Modal.Footer>
            {activeEvent && <BtnDeleteEvent />}
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              Crear jornada
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
