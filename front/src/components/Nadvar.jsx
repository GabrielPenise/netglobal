import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Nadvar.module.scss";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Axios } from "../utils/AxiosWithCredentials";
import { unSet } from "../store/slices";

function Nadvar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await Axios.post("/client/logout");
    dispatch(unSet());
    navigate("/login");
  };

  console.log("user es ", user);
  return (
    <Nav className={`${style["nav"]}  justify-content-between`}>
      <img className={style["logoNav"]} src={logo} />

      {user ? (
        <CiLogin className={style["logOut"]} onClick={handleLogOut} />
      ) : (
        <Button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Button>
      )}
    </Nav>
  );
}

export default Nadvar;
