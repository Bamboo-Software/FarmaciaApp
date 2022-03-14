import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/header";
import Login from "./Components/login/login"
import Signup from "./Components/login/signup";
import Home from "./Pages/Landing/Inicio";
import Barra from "./Components/NavBar/NavBar";
import Profile from "./Components/profile/Profile";
import Carrito from "./Pages/CarroCompras/Carrito";
import Advertencia from "./Components/login/Advertencia";
import Redireccion from "./Components/login/Redireccion";

import Chat from "./Components/chatbot/Chat";
function App() {
  return (
    <>
      <Header />
      
      <Barra />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CarroCompras" element={<Carrito />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CarroCompras" element={<Carrito />} />
        <Route path="/Advertencia" element={<Advertencia />} />
        <Route path="/Redireccion" element={<Redireccion />} />
      </Routes>
    </>
  );
}

export default App;
