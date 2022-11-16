import Nadvar from "./components/Nadvar";
import Fotter from "./components/Fotter";
import Sidebar from "./components/SideBar";
import Login from "./screens/Login";


function App() {
  return (
    <div className="App">
      <Nadvar />
      <Sidebar />
      <Login />
      <Fotter />
    </div>
  );
}

export default App;
