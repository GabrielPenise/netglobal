import React, { useEffect, useState } from "react";
import BtnDeleteEvent from "../Buttons/BtnDeleteEvent";
import moment from "moment";
import Swal from "sweetalert2";

import DateTimePicker from "react-datetime-picker";
import { FetchsDb } from "../../utils/FetchsDb.js";
import { Button, Modal, Form, Dropdown, DropdownButton } from "react-bootstrap";

import "../../assets/styles/commons/CalendarioModal.css";
import { useDispatch, useSelector } from "react-redux";
import {
  eventAddNew,
  setUiOpen,
  unSetEventActive,
  eventUpdate,
} from "../../store/slices/index.js";
import DropDownSelect from "../DropDown/DropDownSelect";
import DropDownModalGuards from "../DropDown/DropDownModalGuards";

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
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      title: e.label,
    });
  };

  const validateDates = (start, end) => {
    const momentStartDate = moment(start);
    const momentEndDate = moment(end);

    if (momentEndDate.isSameOrAfter(momentStartDate)) {
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
            <DropDownModalGuards handleInputChange={handleInputChange} />
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
};

// const DropDownGuards = ({ defaultGuard, activeEvent }) => {
//   const { title } = defaultGuard;
//   const [guards, setGuards] = useState([]);
//   const [guard, setGuard] = useState({
//     label: `Turno ${title} `,
//     value: defaultGuard,
//   });
//   const { user } = useSelector((state) => state.user);

//   const getGuards = async () => {
//     const guardsArr = await FetchsDb.fetchGet(`/guards/byclient/${user.id}`);

//     const optionsGuardsArr = guardsArr.map((element) => {
//       return {
//         label: `Turno ${element.fullname} `,
//         value: element,
//       };
//     });

//     setGuards(optionsGuardsArr);
//   };

//   useEffect(() => {
//     getGuards();
//   }, [activeEvent]);

//   const handleGuards = (e) => {
//     setGuard(e);
//   };

//   return (
//     <DropDownSelect
//       value={guard}
//       options={guards}
//       handleSelect={handleGuards}
//     />
//   );
// };
