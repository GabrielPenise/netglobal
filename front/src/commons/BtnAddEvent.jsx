import React from "react";
import { FaPlus } from "react-icons/fa";
import style from "../assets/styles/commons/BtnAddEvent.module.scss";
import { useModalContext } from "../context/ModalContext";

export const BtnAddEvent = () => {
  const { uiOpen, setUiOpen } = useModalContext();

  const handleClickBtnEvent = () => {
    setUiOpen(true);
  };
  return (
    <button
      className={`btn btn-primary ${style["btnAddEvent"]}`}
      onClick={handleClickBtnEvent}
    >
      <FaPlus />
    </button>
  );
};
