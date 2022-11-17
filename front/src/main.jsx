import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ModalContextProvider } from "./context/ModalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ModalContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ModalContextProvider>
  </BrowserRouter>
);
