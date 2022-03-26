import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, NavLink } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { auth } from "../../Firebase/firebase.utils";
import { contextoUser } from "../../contexto/contexto";
import { agregarPago } from "../../Firebase/pagos";
import {
    obtenerUsuario,
    agregarUsuario,
    crearDocumentoUsuarios
} from "../../Firebase/usuarios";

function Pago() {
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Container fluid className="caja">
                            <Form className='formulario'>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Nombre completo" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDireccion">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control
                                        type="text" placeholder="Direccion" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control

                                        type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="9999-9999" />
                                </Form.Group>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="primary"
                                            style={{
                                                backgroundColor: "#5AC4FF",
                                                borderColor: "#5AC4FF"
                                            }}
                                        >
                                            Realizar Pago
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Pago;