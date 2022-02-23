import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/header";
import Login from "./Components/login/login"
import Signup from "./Components/login/signup";
import Home from "./Pages/Landing/Inicio";
import Barra from "./Components/NavBar/NavBar";

function App() {
  return (
    <>
      <Header />
      <Barra />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login/>} />
        <Route exact path="/Signup" element={<Signup/>} />
      </Routes>
    </>
  );
}

export default App;
