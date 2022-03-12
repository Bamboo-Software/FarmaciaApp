import React, { useContext } from "react";
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

function Header() {
    const navigate = useNavigate();
    const user = useContext(contextoUser);

    const handleSignOut = () => {
        auth.signOut();
        window.location.replace("/");
    };

    function handleClick(path) {
        navigate(path);
    }
    return (
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
                    />
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <span className="search">
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
                            <div>{`Hola ${user.email}`}</div>
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
    );
}

/*<Col className="d-flex justify-content-end">
                    <NavLink>Contactar</NavLink>

                    <NavLink onClick={() => handleClick("/Profile")}>Usuario</NavLink>
                </Col> */

export default Header;