import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, Component } from "react";
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/firebase.utils";
import test2 from "../../assets/ImagenTest1.jpg";
import { obtenerUsuario } from "../../Firebase/usuarios";
import carrito from "../../assets/compra.svg";
import './Profile.css';

function Profile() {
    const favs = [
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" }
    ];

    const [user, setUser] = useState({
        Nombre: "",
        correo: "",
        createdAt: "",
        uid: "",
        ListaCompras: [],
        ListaAnterior: [],
        Direccion: "",
        telefono: ""
    });

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            obtenerUsuario(!!userAuth ? userAuth.uid : null)
                .then(usuario => {
                    console.log("Entre a usuario")
                    const ref = usuario;
                    console.log(ref);
                    setUser({
                        Nombre: !!userAuth ? ref.Nombre : "",
                        correo: userAuth.email,
                        createdAt: !!userAuth ? ref.fechaCreacion.toDate() : "",
                        uid: !!userAuth ? ref.UID : "",
                        ListaCompras: !!userAuth ? ref.ListaCompras : [],
                        ListaAnterior: !!userAuth ? ref.ListaAnterior : [],
                        Direccion: !!userAuth ? ref.Direccion : "",
                        telefono: !!userAuth ? (ref.Telefono ? ref.Telefono : "") : ""
                    });
                })
                .catch(() => {
                    console.log("Quiebro aca")
                    setUser({
                        Nombre: "",
                        correo: "",
                        createdAt: "",
                        uid: "",
                        ListaCompras: [],
                        ListaAnterior: [],
                        Direccion: "",
                        telefono: ""
                    });
                });
        });
    }, []);

    const anterior=user.ListaAnterior;
    console.log("datos");
    console.log(user);
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
                                    <Form.Control type="text" placeholder="Jose Gomez" value={user.Nombre} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailProfile">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" placeholder="JoseGomez@gmail.com" value={user.correo} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phoneProfile">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text" placeholder="0000-0000" value={user.telefono} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addressProfile">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control type="text" placeholder="Res. Las Uvas, Tegucigalpa, Francisco Morazan" value={user.Direccion} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addressProfile">
                                    <Form.Label>Fecha de creacion</Form.Label>
                                    <Form.Control type="text" placeholder="Res. Las Uvas, Tegucigalpa, Francisco Morazan" value={user.createdAt} disabled />
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
                    <h6>Productos comprados anteriormente</h6>
                    <Col className="d-flex justify-content-center">
                        <Row xs={1} md={2} className="g-4">
                            {Array.isArray(anterior) && Boolean(anterior.length) ? (
                                favs.slice().map((elem, index) => {
                                    return (
                                        <Card className="tarjeta" key={index.toString()}>
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
                                                    <Button
                                                        style={{
                                                            backgroundColor: "#89E9A9",
                                                            borderColor: "#89E9A9",
                                                            color: "#000000"
                                                        }}><img src={carrito} />Añadir</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h1 className="text-center">
                                        Lo siento, aun no ha comprado ningun articulo :c
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
