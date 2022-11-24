import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { BsLinkedin, BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <MDBFooter
      bgColor="light"
      className="text-center text-lg-start text-muted p-2"
    >
      <MDBContainer className="text-center">
        <MDBRow>
          <MDBCol className="mx-auto">
            <p className="mb-1">
              <a>Gabriel Penise</a>
              <MDBIcon icon="envelope" className="me-3 espacio" />
              <a href="https://www.linkedin.com" className="me-2">
                <BsLinkedin />
              </a>
              <a href="https://github.com">
                <BsGithub />
              </a>
            </p>
            <p className="mb-1">
              <a>Carmela Cacabelos</a>
              <MDBIcon icon="envelope" className="me-3" />
              <a href="https://www.linkedin.com" className="me-1">
                <BsLinkedin />
              </a>
              <a href="https://github.com">
                <BsGithub />
              </a>
            </p>
            <p className="mb-1">
              <a>Gerardo Burgos</a>
              <MDBIcon icon="envelope" className="me-3" />
              <a href="https://www.linkedin.com" className="me-2">
                <BsLinkedin />
              </a>
              <a href="https://github.com">
                <BsGithub />
              </a>
            </p>
            <p className="mb-1">
              <a>Gisela Arroyo</a>
              <MDBIcon icon="envelope" className="me-3" />
              <a href="https://www.linkedin.com" className="me-2">
                <BsLinkedin />
              </a>
              <a href="https://github.com">
                <BsGithub />
              </a>
            </p>
            <p className="mb-2">
              <a>Alberto Carrillo</a>
              <MDBIcon icon="envelope" className="me-3" />
              <a href="https://www.linkedin.com" className="me-2">
                <BsLinkedin />
              </a>
              <a href="https://github.com">
                <BsGithub />
              </a>
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div
        className="text-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.00)" }}
      >
        © 2022 Todos los derechos Reservados:{" "}
        <a className="text-dark" href="https://netglobal.tech/">
          Net Global
        </a>
      </div>
    </MDBFooter>
  );
}
