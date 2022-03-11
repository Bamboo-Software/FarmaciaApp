import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Redireccion.css";
import { auth } from "../../Firebase/firebase.utils";
function Redireccion() {
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
                                    Un paso más
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <p className="Parrafo">
                                    ¡Al registrarse recibira un correo de verificacion, por favor
                                    revisar su correo en la bandeja de entrada o correo no deseado/Spam!
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Button
                                    style={{
                                        width: "280px",
                                        marginBottom: "2rem",
                                        backgroundColor: "#5AC4FF",
                                        borderColor: "#5AC4FF",
                                        marginBottom: "2rem"
                                    }}
                                    variant="primary"
                                    type="submit"
                                    onClick={handleClick}
                                >
                                    Iniciar Sesion
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Redireccion;