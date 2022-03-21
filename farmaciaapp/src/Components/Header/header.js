import React, { useContext, useState, useEffect } from "react";
import "./header.css";

import { auth } from "../../Firebase/firebase.utils";
import { Button, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { NavLink } from 'react-bootstrap';
import searchIcon from "../../assets/search_black_24dp.svg";
import { useNavigate } from "react-router-dom";
import logito from "../../assets/logoProvisional.jpg";
import { contextoUser } from "../../contexto/contexto";
import carrito from "../../assets/compra.svg";
import Home  from "../../Pages/Landing/Inicio";

function Header() {
    const [busqueda, setBusqueda] = useState("");
    const [data, setData] = useState("");
    console.log(busqueda);
    const navigate = useNavigate();
    const user = useContext(contextoUser);

    const sendText = () => {
        setData(busqueda);
       // window.location.replace("/");
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
                                    marginTop: "0.9rem"
                                }}>
                                    <a
                                        style={{
                                            marginTop: "0.9rem"
                                        }}
                                    >{`Hola usuario`}</a>
                                </div>
                                <a></a>
                                <NavLink
                                    style={{
                                        marginTop: "0.4rem",
                                        color: "#000000"
                                    }}
                                >Contactar</NavLink>

                                <NavLink
                                    style={{
                                        marginTop: "0.4rem",
                                        color: "#000000"
                                    }}
                                    onClick={() => handleClick("/CarroCompras")}
                                ><img src={carrito} /> Lista</NavLink>

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
                                >Contactar</NavLink>

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
        </>
    );
}

/*<Col className="d-flex justify-content-end">
                    <NavLink>Contactar</NavLink>

                    <NavLink onClick={() => handleClick("/Profile")}>Usuario</NavLink>
                </Col> */

export default Header;