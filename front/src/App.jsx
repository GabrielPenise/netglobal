import Nadvar from "./components/Nadvar";
import Fotter from "./components/Fotter";
import Sidebar from "./components/SideBar";
import Calendario from "./commons/Calendario";
import Login from "./screens/Login";
import Home from "./screens/Home";

import { Route, Routes } from "react-router-dom";
import DropDownSelect from "./commons/DropDownSelect";
import { Axios } from "./utils/AxiosWithCredentials";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/index.js";

function App() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const userAuth = async () => {
    try {
      const { data } = await Axios.get("/client/validate");
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
      <Nadvar />
      {!user ? (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : (
        <>
          <Sidebar />
          <Routes>
            {user["super_admin"] ? (
              <Route path="/superadmin" element={<DropDownSelect />} />
            ) : (
              <>
                <Route path="/calendar" element={<Calendario />} />
                <Route
                  path={`/branch/${user.id}`}
                  element={<DropDownSelect />}
                />

                <Route
                  path={`/guards/${user.id}`}
                  element={<DropDownSelect />}
                />
                <Route path="/home" element={<Home />} />
              </>
            )}
          </Routes>
        </>
      )}

      <Fotter />
    </div>
  );
}

export default App;
