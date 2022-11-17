import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Col, Row } from 'react-bootstrap';
import imagen from "../assets/styles/image/gris_cuadrado.png"
import style from "../assets/styles/screens/Login.module.scss"


function Login() {
  return (
    <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6} className="rounded-5 p-4 mt-4 ">
            <div className={style["divGeneral"]}>
       <img className={style["imagenLog"]} src={imagen} />
       </div>
            <Form >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su Email"
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Ingrese su Contraseña"
                  required
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