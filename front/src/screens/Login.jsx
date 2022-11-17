
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

    <div className={style["login_container"]}>
      <Form className={style["registro"]} onSubmit={handleSubmit}>
        <img className={style["svg"]} src={imagen} />
        <Form.Group className="mb_3" controlId="formBasicEmail">
          <Form.Label className={style["Form_Label"]}>Email</Form.Label>
          <Form.Control
            className={style["Form_Control"]}
            type="email"  
            placeholder="Ingrese su email"
            onChange={(e) => setEmail(e.target.value)} value={email}
          />
        </Form.Group>

        <Form.Group className="mb_3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            className={style["Form_Control"]}
            type="password"
            
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)} value={password}
          />
        </Form.Group>
        <Form.Group className="mb_3" controlId="formBasicCheckbox"></Form.Group>
        <Button className={style["Button"]} variant="primary" type="submit">
          Ingresar
        </Button>
        <Form.Text className="text-muted">
          ¿Olvido su contraseña? Haga Click aquí
        </Form.Text>
      </Form>
    </div>


  );
}

export default Login;
