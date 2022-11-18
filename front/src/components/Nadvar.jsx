import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Nadvar.module.scss";
import { CiLogin } from "react-icons/ci";
import {Link }from "react-router-dom";
function Nadvar() {
  return (
    <Nav className={`${style["nav"]}  justify-content-between`}>
      <img className={style["logoNav"]} src={logo} />
      <Link to="/home">
      <CiLogin className={style["logOut"]} />
      </Link >
    </Nav>
  );
}

export default Nadvar;
