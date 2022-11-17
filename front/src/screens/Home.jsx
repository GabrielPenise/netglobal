import React from "react";
import style from "../assets/styles/screens/Home.module.scss";
import imagen from "../assets/styles/image/gris_cuadrado.png";
import { Container, Col, Row } from "react-bootstrap";

function Home() {
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div className={style["divGeneral"]}>
              <img className={style["imagenLog"]} src={imagen} />
            </div>
            <div className={style["tituloHome"]}>
              <h3>Bienvenido Fravega!</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
