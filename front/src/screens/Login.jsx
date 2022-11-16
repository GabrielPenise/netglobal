import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {AiOutlineUser} from "react-icons/ai"
import style from "../assets/styles/screens/Login.module.scss"


function Login() {
  return (
    <div className={style['login_container']}>
    <Form className={style['registro']}>
        <p className={style['svg']}>
          <AiOutlineUser />
        </p>
      <Form.Group className="mb_3" controlId="formBasicEmail">
        <Form.Label className={style['Form_Label']}>Email</Form.Label>
        <Form.Control className={style['Form_Control']}type="email" placeholder="Ingrese su email" />
      </Form.Group>

      <Form.Group className="mb_3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control className={style['Form_Control']} type="password" placeholder="Contraseña" />
      </Form.Group>
      <Form.Group className="mb_3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button className={style['Button']}variant="primary" type="submit">
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