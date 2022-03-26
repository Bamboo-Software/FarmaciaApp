import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Redireccion.css";
import { auth } from "../../Firebase/firebase.utils";
function Redireccion() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/");
    }
    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Container fluid className="caja">
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <h1>
                                    Estado de compra
                                </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <p className="Parrafo">
                                    ¡Compra realizada con exito! para mas informacion puede usar la informacion de contacto.
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
                                    Volver a la pagina principal
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