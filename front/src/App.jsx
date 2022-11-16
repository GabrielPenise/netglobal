import Nadvar from "./components/Nadvar";
import Fotter from "./components/Fotter";
import Sidebar from "./components/SideBar";
import Calendario from "./commons/Calendario";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Nadvar />
      <Sidebar />

      <Routes>
        <Route path="/calendar" element={<Calendario />} />
      </Routes>

      <Fotter />

    </div>
  );
}

export default App;
