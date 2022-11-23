import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Nadvar.module.scss";
import { CiLogin } from "react-icons/ci";
import {Link }from "react-router-dom";
import {useAuthContext} from "../context/AuthContext";
import axios from "axios";
function Nadvar() {
  const {user, setUser}= useAuthContext()
  const handlerLogOut = () =>{
    axios.post("http://localhost:3001/api/client/logout", {withCredentials: true})
    .then(()=> setUser(null))
  }
  
  return (
    <Nav className={`${style["nav"]}  justify-content-between`}>
      <img className={style["logoNav"]} src={logo} />
      <Link to="/home">
      <CiLogin className={style["logOut"]} onClick={handlerLogOut}/>
      </Link >
    </Nav>
  );
}

export default Nadvar;
