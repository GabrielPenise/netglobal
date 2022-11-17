import React, { useContext, useState } from "react";
import { createContext } from "react";

export const ModalContext = createContext();

//AuthContextProvider pasa las props en index
export const ModalContextProvider = ({ children }) => {
  const [uiOpen, setUiOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ uiOpen, setUiOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

//Con useAuthContext podes ingresar directamente a las props, si existe el contexto
export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("No hay contexto para el modal");
  return context;
};
