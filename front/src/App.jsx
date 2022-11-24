import Navbar from "./components/Nadvar";
import Footer from "./components/Footer";
import Sidebar from "./components/SideBar";
import Reports from "./components/Reports";
import Calendario from "./commons/Calendario";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Geolocalizacion from "./geolocalizacion/Geolocalizacion";

import { Navigate, Route, Routes } from "react-router-dom";

import { Axios } from "./utils/AxiosWithCredentials";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/index.js";
import Guards from "./components/Guards";
import Branchs from "./components/Branchs";
import SuperAdmin from "./components/SuperAdmin";

function App() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const userAuth = async () => {
    try {
      const { data } = await Axios.get("/clients/validate");
      dispatch(setUser(data));
    } catch (err) {
      console.log(err, "cookie no encontrada");
    }
  };

  useEffect(() => {
    userAuth();
  }, []);

  return (
    <div className="App">
      <Navbar />
      {!user ? (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </>
      ) : (
        <>
          <Sidebar />
          <Routes>
            {user["super_admin"] ? (
              <Route path="/superadmin" element={<SuperAdmin />} />
            ) : (
              <>
                <Route path="/" element={<Navigate to={"/home"} />} />
                <Route path="/calendar" element={<Calendario />} />

                <Route path={`/branch/${user.id}`} element={<Branchs />} />

                <Route path={`/guards/${user.id}`} element={<Guards />} />

                <Route path="/geo" element={<Geolocalizacion />} />

                <Route path="/home" element={<Home />} />
                <Route path="/reports" element={<Reports />} />
              </>
            )}
          </Routes>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
