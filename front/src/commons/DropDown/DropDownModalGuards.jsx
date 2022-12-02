import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchsDb } from "../../utils/FetchsDb";
import DropDownSelect from "./DropDownSelect";

export default function DropDownModalGuards({ handleSelect }) {
  const { activeEvent } = useSelector((state) => state.calendar);

  let checkeo = {};
  activeEvent ? (checkeo = activeEvent.title) : (checkeo = "Elija un Guardia");
  const [guards, setGuards] = useState([]);
  const [guardInput, setGuardInput] = useState({
    value: null,
    label: `${checkeo}`,
  });
  const { user } = useSelector((state) => state.user);

  const getGuards = async () => {
    const guardsArr = await FetchsDb.fetchGet(`/guards/byclient/${user.id}`);

    const optionsGuardsArr = guardsArr.map((element) => {
      return {
        label: `Turno ${element.fullname} `,
        value: element,
      };
    });

    setGuards(optionsGuardsArr);
  };

  useEffect(() => {
    getGuards();
  }, []);

  //   const handleGuards = (e) => {
  //     setGuardInput(e);
  //   };

  return (
    <DropDownSelect
      options={guards}
      handleSelect={handleSelect}
      defVal={guardInput}
    />
  );
}
