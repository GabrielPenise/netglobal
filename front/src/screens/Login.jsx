
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import imagen from "../assets/styles/image/gris_cuadrado.png";
import style from "../assets/styles/screens/Login.module.scss";
import axios from "axios"
import { useState } from "react";
import { Container, Col, Row } from 'react-bootstrap';




function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/api/client/login", {email, password}, {withCredentials:true})
    .then(res=>res.data)
    .catch(()=>alert("Email o contraseNa incorrecta"))
  };

  return (
  
  <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div className={style["divGeneral"]}>
       <img className={style["imagenLog"]} src={imagen} />
       </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su Email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)} value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingrese su Contraseña"
                  required
                  onChange={(e) => setPassword(e.target.value)} value={password}
                />
              </Form.Group>

              <Button  type="submit">
                Ingresar
              </Button>
            </Form>
              <Form.Text className="text-muted">
        ¿Olvido su contraseña? Haga Click aquí
       </Form.Text>
          </Col>
        </Row>
      </Container>

  );
}

export default Login;
