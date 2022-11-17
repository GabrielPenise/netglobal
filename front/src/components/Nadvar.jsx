import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Nadvar.module.scss";
import ButtonLogOut from "../commons/ButtonLogOut";

function Nadvar() {
  return (
    <Nav className="nav">
      <img className={style["logoNav"]} src={logo} />
      <ButtonLogOut/>
    </Nav>
  );
}

export default Nadvar;
