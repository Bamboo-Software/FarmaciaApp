import React from "react";
import "./header.css";

import { Button, Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { NavLink } from 'react-bootstrap';
import searchIcon from "../../assets/search_black_24dp.svg";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-start">
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
                </Col>
                <Col className="d-flex justify-content-end">
                    <NavLink>Contactar</NavLink>

                    <NavLink onClick={() => handleClick("/Profile")}>Usuario</NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default Header;