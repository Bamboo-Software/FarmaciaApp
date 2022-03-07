import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { Container, NavLink } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import './login.css';
function Login() {
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
                                    <Form.Control type="text" placeholder="Nombre completo" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDireccion">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control type="text" placeholder="Direccion" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Form.Group className="mb-3">
                                            <Form.Text className="text-muted">
                                                ¿Ya tienes cuenta? <NavLink onClick={() => handleClick("/login")}>Iniciar sesion</NavLink>
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="primary" type="submit"
                                        style={{
                                            backgroundColor: "#5AC4FF",
                                            borderColor: "#5AC4FF"
                                        }}
                                        >
                                            Registrarse
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;
