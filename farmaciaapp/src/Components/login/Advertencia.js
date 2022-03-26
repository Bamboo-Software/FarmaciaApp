import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Redireccion.css";
import { auth } from "../../Firebase/firebase.utils";

function Advertencia() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/Login");
    }
    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Container fluid className="caja">
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <h1>
                                    Advertencia
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <p className="Parrafo">
                                    Por favor inicie sesion para acceder a esta pagina
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button
                                    style={{
                                        width: "280px",
                                        backgroundColor: "#5AC4FF",
                                        borderColor: "#5AC4FF",
                                        marginBottom: "2rem"
                                    }}
                                    variant="primary"
                                    type="submit"
                                    onClick={handleClick}
                                >
                                    Iniciar sesion
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Advertencia;