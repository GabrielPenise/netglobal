import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Nadvar.module.scss";
import {CiLogin} from "react-icons/ci"

function Nadvar() {
  return (
    <Nav className={style["nav"]}>
      <div className={style["contenedor-nav"]}>
      <img className={style["logoNav"]} src={logo} />
      <CiLogin className={style["logOut"]}/>
      </div>
    </Nav>
  );
}

export default Nadvar;
