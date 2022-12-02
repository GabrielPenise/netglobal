import React, { useEffect, useState } from "react";
import BtnDeleteEvent from "../Buttons/BtnDeleteEvent";
import moment from "moment";
import Swal from "sweetalert2";
import Fecha from "./Fecha";
import Turnos from "./Turnos";
import { Axios } from "../../utils/AxiosWithCredentials";

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
  start: null,
  end: null,
  notes: "",
  guardId: null,
  branchId: null,
  id: null,
  shiftId: null,
  date: null,
};

export const CalendarioModal = ({ branch }) => {
  const dispatch = useDispatch();
  const { uiOpen } = useSelector((state) => state.modal);
  const { activeEvent } = useSelector((state) => state.calendar);

  const [dateStart, setDateStart] = useState(startDate.toDate());
  const [dateEnd, setDateEnd] = useState(endDate.toDate());
  const [formData, setFormData] = useState(initialState);
  const [date, setDate] = useState(new Date());

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
    setDate(moment(e).format("YYYY-MM-DD"));
    setFormData({
      ...formData,
      date: moment(e).format("YYYY-MM-DD"),
    });
  };

  const handleShiftChange = (e) => {
    const start = moment(`${date} ${e.value.start}`).toDate();
    const end = moment(`${date} ${e.value.end}`).toDate();

    setFormData({
      ...formData,
      shiftId: e.value.id,
      start,
      end,
    });
  };
  const validateDates = (date) => {
    // const momentStartDate = moment(date);
    // const momentEndDate = moment(new Date());

    // if (momentEndDate.isSameOrAfter(momentStartDate)) {
    //   //Fecha de inicio no puede ser Igual o Menor que la de finalizacion.
    //   Swal.fire("Error", "Fecha incorrecta, verificar", "error");
    // }

    if (formData.title.length === 0) {
      //Fecha de inicio no puede ser Igual o Menor que la de finalizacion.
      Swal.fire("Error", "Tiene que asignar un guardia", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validar fecha e inputs
    const error = validateDates(formData.date);
    if (error) return;

    if (activeEvent) {
      //endpoint para updatear evento
      try {
        await Axios.put("/events", formData);
        dispatch(eventUpdate(formData));
      } catch (err) {
        Swal.fire(
          "Error",
          "No se pudo editar el evento, recuerda que para editar tiene que cambiar el guardia. ",
          "error"
        );

        console.error("No se pudo editar el evento");
      }
    } else {
      //endpoint para crear evento
      try {
        await Axios.post("/events", { ...formData, branchId: branch.id });
        dispatch(eventAddNew({ ...formData, branchId: branch.id }));
      } catch (err) {
        Swal.fire(
          "Error",
          "No se pudo crear el evento, revise los campos ",
          "error"
        );
        console.error(err, "Cant Create Events");
      }
    }

    closeModal();
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
        <Modal.Title>{activeEvent ? "Editar" : "Nueva jornada"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {activeEvent ? (
            `${activeEvent.date}`
          ) : (
            <div className="mb-3">
              <label className="form-label">
                <Fecha handleSelect={handleDateChange} />
              </label>
            </div>
          )}

          {activeEvent ? null : (
            <div className="mb-3">
              <Turnos handleSelect={handleShiftChange} />
            </div>
          )}

          <div className="mb-3">
            <DropDownModalGuards handleSelect={handleGuardChange} />
          </div>

          <Modal.Footer>
            {activeEvent && <BtnDeleteEvent />}
            <Button variant="secondary" onClick={closeModal}>
              Cerrar
            </Button>
            <Button variant="primary" type="submit">
              {activeEvent ? "Editar" : "Nueva jornada"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
