import React, { useContext, useState, useEffect } from "react";

import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/header";
import Contacto from "./Components/Footer/Contacto";
import Login from "./Components/login/login"
import Signup from "./Components/login/signup";
import Home from "./Pages/Landing/Inicio";
import Barra from "./Components/NavBar/NavBar";
import Profile from "./Components/profile/Profile";
import Carrito from "./Pages/CarroCompras/Carrito";
import Advertencia from "./Components/login/Advertencia";
import Redireccion from "./Components/login/Redireccion";
import Higiene from "./Pages/Landing/higiene";
import Mascarillas from "./Pages/Landing/mascarillas";
import Medicamentos from "./Pages/Landing/medicamentos";

import { NavLink } from 'react-bootstrap';
import searchIcon from "./assets/search_black_24dp.svg";
import { useNavigate } from "react-router-dom";
import logito from "./assets/logoProvisional.jpg";
import { contextoUser } from "./contexto/contexto";
import carrito from "./assets/compra.svg";
import { auth, firestore } from "./Firebase/firebase.utils";
import { Button, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { obtenerUsuario, modificarUsuario } from "./Firebase/usuarios";

function App() {
  const [busqueda, setBusqueda] = useState("");
  const [data, setData] = useState("");
  console.log(busqueda);
  const navigate = useNavigate();
  const user = useContext(contextoUser);
  const [size, setSize] = useState("");

  console.log("tamaño arreglo: ");
  console.log(size);

  const [user2, setUser2] = useState({
    Nombre: "",
    //    correo: "",
    fechaCreacion: "",
    UID: "",
    ListaCompras: [],
    ListaAnterior: [],
    Direccion: "",
    Telefono: ""
  });
  let tama = "";

  /*useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      obtenerUsuario(!!userAuth ? userAuth.uid : null)
        .then(usuario => {
          console.log("Entre a usuario")
          const ref = usuario;
          console.log(ref);
          setUser2({
            Nombre: !!userAuth ? ref.Nombre : "",
            //                  correo: userAuth.email,
            fechaCreacion: !!userAuth ? ref.fechaCreacion.toDate() : "",
            UID: !!userAuth ? ref.UID : "",
            ListaCompras: !!userAuth ? ref.ListaCompras : [],
            ListaAnterior: !!userAuth ? ref.ListaAnterior : [],
            Direccion: !!userAuth ? ref.Direccion : "",
            Telefono: !!userAuth ? (ref.Telefono ? ref.Telefono : "") : ""
          });
          console.log(user2.ListaCompras.length);
        })
        .catch((err) => {
          console.log("Quiebro aca")
          console.log(err);
          setUser2({
            Nombre: "",
            //correo: "",
            fechaCreacion: "",
            UID: "",
            ListaCompras: [],
            ListaAnterior: [],
            Direccion: "",
            Telefono: ""
          });
        });
    });
    
  }, []);*/

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth.uid != null) {
        firestore.collection("usuarios")
          .where('UID', '==', userAuth.uid)
          .onSnapshot((snapshot) => {
            let ref="";
            snapshot.docs.map((doc) => {
              ref=doc.data();
            });
            console.log(ref);
            setUser2({
              Nombre: !!userAuth ? ref.Nombre : "",
              //                  correo: userAuth.email,
              fechaCreacion: !!userAuth ? ref.fechaCreacion.toDate() : "",
              UID: !!userAuth ? ref.UID : "",
              ListaCompras: !!userAuth ? ref.ListaCompras : [],
              ListaAnterior: !!userAuth ? ref.ListaAnterior : [],
              Direccion: !!userAuth ? ref.Direccion : "",
              Telefono: !!userAuth ? (ref.Telefono ? ref.Telefono : "") : ""
            });
          });
      } else {
        console.log("fallo");
      }
    });
  }, []);


  const sendText = () => {
    setData(busqueda);
    //   handleClick("/");
  }

  const handleSignOut = () => {
    auth.signOut();
    window.location.replace("/");
  };

  function handleClick(path) {
    navigate(path);
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col className="d-flex justify-content-start">
            <NavLink onClick={() => handleClick("/")}><img className="Logo" src={logito} /></NavLink>
          </Col>
          <Col className="d-flex justify-content-center">
            <Form.Control type="email" placeholder="Busqueda en catalogo"
              style={{
                marginTop: "0.5rem",
                width: "480px"
              }}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Row>
              <Col className="d-flex justify-content-center">

                <span className="search"
                  onClick={() => sendText()}
                >
                  <img

                    src={searchIcon}
                  />
                </span>

              </Col>

            </Row>
          </Col>
          <Col className="d-flex justify-content-end">
            {user.isAuth ? (
              <>
                <div style={{

                }}>
                  <NavLink
                    style={{
                      marginTop: "0.4rem",
                      color: "#000000"
                    }}
                    onClick={() => handleClick("/Profile")}
                  >{`Hola usuario`}</NavLink>
                </div>
                <a></a>

                <NavLink
                  style={{
                    marginTop: "0.4rem",
                    color: "#000000"
                  }}
                  onClick={() => handleClick("/CarroCompras")}
                ><img src={carrito} /> {`(${user2.ListaCompras.length})Lista`}</NavLink>

                <NavLink
                  style={{
                    marginTop: "0.4rem",
                    color: "#000000"
                  }}
                  onClick={() => handleSignOut()}
                >Cerrar Sesión</NavLink>
              </>
            ) : (
              <>
                <NavLink
                  style={{
                    marginTop: "0.4rem",
                    color: "#000000"
                  }}
                  onClick={() => handleClick("/Signup")}
                >Registrate</NavLink>
                <NavLink
                  style={{
                    marginTop: "0.4rem",
                    color: "#000000"
                  }}
                  onClick={() => handleClick("/Login")}
                >Acceder</NavLink>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Barra />
      <Routes>
        <Route path="/" element={<Home sendText={data} />} />
        <Route path="/Higiene" element={<Higiene sendText={data} />} />
        <Route path="/Mascarillas" element={<Mascarillas sendText={data} />} />
        <Route path="/Medicamentos" element={<Medicamentos sendText={data} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CarroCompras" element={<Carrito />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CarroCompras" element={<Carrito />} />
        <Route path="/Advertencia" element={<Advertencia />} />
        <Route path="/Redireccion" element={<Redireccion />} />
      </Routes>
      <Contacto />
    </>
  );
}
/*                <NavLink
                  style={{
                    marginTop: "0.4rem",
                    color: "#000000"
                  }}
                >Contactar</NavLink>*/

export default App;
