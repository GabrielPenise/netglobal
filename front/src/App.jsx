import Nadvar from "./components/Nadvar";
import Fotter from "./components/Fotter";
import Sidebar from "./components/SideBar";
import Calendario from "./commons/Calendario";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Geolocalizacion from "./geolocalizacion/Geolocalizacion"

import { Route, Routes } from "react-router-dom";
import DropDownSelect from "./commons/DropDownSelect";
import axios from "axios";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const { user, setUser } = useAuthContext();

  const userAuth = async () => {
    try {
      const usuario = await axios.get(
        "http://localhost:3001/api/client/validate",
        {
          withCredentials: true,
        }
      );
      setUser(usuario.data);
    } catch (err) {
      console.log(err, "cookie no encontrada");
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <div className="App">
      <Nadvar />
      <Sidebar />
      <Routes>
        {!user ? (
          <>
            <Route path="/login" element={<Login />} />
            
          </>
        ) : (
          <>
            <Route path="/calendar" element={<Calendario />} />
            <Route path="/sucursales" element={<DropDownSelect />} />
            <Route path="/superadmin" element={<DropDownSelect />} />
            <Route path="/vigiladores" element={<Geolocalizacion />} />
            <Route path="/home" element={<Home />} />
          </>
        )}
      </Routes>
      <Fotter />
    </div>
  );
}

export default App;
