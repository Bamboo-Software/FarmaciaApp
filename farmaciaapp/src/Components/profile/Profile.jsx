import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from "react-router-dom";
import test2 from "../../assets/ImagenTest1.jpg";
import './Profile.css';
function Profile() {
    const favs = [
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" }
    ];

    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    return (
        <Container fluid>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Container fluid className="caja">
                            <Form className='perfil'>
                                <Form.Group className="mb-3" controlId="nameProfile">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Jose Gomez" disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailProfile">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" placeholder="JoseGomez@gmail.com" disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phoneProfile">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text" placeholder="0000-0000" disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addressProfile">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control type="text" placeholder="Res. Las Uvas, Tegucigalpa, Francisco Morazan" disabled />
                                </Form.Group>
                                <Button variant="primary" type="submit"
                                style={{
                                    backgroundColor: "#5AC4FF",
                                    borderColor: "#5AC4FF"
                                }}
                                >
                                    Editar perfil
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <h6>Medicamentos favoritos</h6>
                    <Col className="d-flex justify-content-center">
                        <Row xs={1} md={2} className="g-4">
                            {Array.isArray(favs) && Boolean(favs.length) ? (
                                favs.slice().map((elem, index) => {
                                    return (
                                        <Card className="tarjeta">
                                            <div className="card-img-top">
                                                <Card.Img className="w-100" variant="top" src={elem.imagen} />
                                            </div>
                                            <Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Card.Title>{elem.nombre}</Card.Title>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Card.Text>
                                                        {elem.Descripcion}
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="primary" type="submit"
                                                    style={{
                                                        width: "170px"
                                                    }}>Buscar</Button>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="danger" type="submit"
                                                    style={{
                                                        marginTop: "2px"
                                                    }}>Eliminar de favoritos</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h1 className="text-center">
                                        Lo siento, aun no hay favoritos :c
                                    </h1>
                                </div>
                            )}
                        </Row>
                    </Col>
                </Row>
                <p></p>
            </Container>
        </Container>
    )
}

export default Profile;
