import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsBuilding } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import Branchs from "./Branchs/Branchs";
import Guards from "./Guards/Guards";

export default function HomeCalendar() {
  const [calendarByBranch, setCalendarByBranch] = useState(false);
  const [calendarByUser, setCalendarByUser] = useState(false);

  const handleBranch = () => {
    setCalendarByUser(false);
    setCalendarByBranch(!calendarByBranch);
  };

  const handleUser = () => {
    setCalendarByBranch(false);
    setCalendarByUser(!calendarByUser);
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      {!calendarByBranch && !calendarByUser ? (
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div>
              <BsBuilding
                size={"6em"}
                style={{ cursor: "pointer" }}
                onClick={handleBranch}
              />
              Mostrar calendario por sucursal
            </div>
          </Col>
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div>
              <BiUserCircle
                size={"6em"}
                style={{ cursor: "pointer" }}
                onClick={handleUser}
              />
              Mostrar calendario por usuario
            </div>
          </Col>
        </Row>
      ) : null}

      {calendarByBranch ? <Branchs /> : null}
      {calendarByUser ? <Guards /> : null}
    </Container>
  );
}
