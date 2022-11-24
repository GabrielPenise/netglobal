import Nav from "react-bootstrap/Nav";
import logo from "../assets/styles/image/logo_azul.png";
import style from "../assets/styles/components/Navbar.module.scss";
import { CiLogin } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Axios } from "../utils/AxiosWithCredentials";
import { unSet } from "../store/slices";

function Navbar() {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await Axios.post("/clients/logout");
    dispatch(unSet());
    navigate("/");
  };

  return (
    <Nav className={`${style["nav"]}  justify-content-between`}>
      {
        user ? (
          <>
            <Link to="/home">
              <img className={style["logoNav"]} src={logo} />
            </Link>
            <CiLogin className={style["logOut"]} onClick={handleLogOut} />
          </>
        ) : null
        // <Button
        //   onClick={() => {
        //     navigate("/login");
        //   }}
        // >
        //   Login
        // </Button>
      }
    </Nav>
  );
}

export default Navbar;
