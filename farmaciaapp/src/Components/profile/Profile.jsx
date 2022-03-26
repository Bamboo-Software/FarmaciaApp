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
import { obtenerUsuario, modificarUsuario } from "../../Firebase/usuarios";
import Toast from 'react-bootstrap/Toast';
import carrito from "../../assets/compra.svg";
import Modal from 'react-bootstrap/Modal';
import './Profile.css';

function Profile() {
    const favs = [
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" },
        { imagen: test2, nombre: "Pastilla para la gripe", Descripcion: "20 lps" }
    ];

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [estado, setEstado] = useState(true);
    const [estado2, setEstado2] = useState(false);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [respuesta, setRespuesta] = useState(false);


    const [user, setUser] = useState({
        Nombre: "",
        //    correo: "",
        fechaCreacion: "",
        UID: "",
        ListaCompras: [],
        ListaAnterior: [],
        Direccion: "",
        Telefono: ""
    });

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            obtenerUsuario(!!userAuth ? userAuth.uid : null)
                .then(usuario => {
                    console.log("Entre a usuario")
                    const ref = usuario;
                    console.log(ref);
                    setCorreo(userAuth.email);
                    setUser({
                        Nombre: !!userAuth ? ref.Nombre : "",
                        //                  correo: userAuth.email,
                        fechaCreacion: !!userAuth ? ref.fechaCreacion.toDate() : "",
                        UID: !!userAuth ? ref.UID : "",
                        ListaCompras: !!userAuth ? ref.ListaCompras : [],
                        ListaAnterior: !!userAuth ? ref.ListaAnterior : [],
                        Direccion: !!userAuth ? ref.Direccion : "",
                        Telefono: !!userAuth ? (ref.Telefono ? ref.Telefono : "") : ""
                    });
                })
                .catch(() => {
                    console.log("Quiebro aca")
                    setUser({
                        Nombre: "",
                        //correo: "",
                        fechaCreacion: "",
                        UID: "",
                        ListaCompras: [],
                        ListaAnterior: [],
                        Direccion: "",
                        Telefono: ""
                    });
                });
        });
    }, []);



    function EditarPerfil() {
        setEstado(false);
        setEstado2(true);
        if (estado == false) {
            console.log("entra");
            user.Nombre = nombre;
            user.Direccion = direccion;
            user.Telefono = telefono;
            modificarUsuario(user);
            setShow(true);
            setEstado2(false);
            setEstado(true);
        }
    }


    function EditarPerfil2() {
        setEstado(false);
        setEstado2(true);
        if (estado == false) {
            console.log("entra2");
            //setShow2(true);
            console.log(respuesta);
            if (respuesta == true) {
                console.log("Si");
            } else {
                console.log("No");
            }
        }
    }

    const handleClose = () => setShow2(false);

    const handleR1 = () => {
        setRespuesta(true);
        setShow2(false);
        EditarPerfil2();
    };

    const handleR2 = () => {
        setRespuesta(false);
        setShow2(false);
        EditarPerfil2();
    };

    const anterior = user.ListaAnterior;

    function AddToCar(ID) {
        try {
            if (user.UID == '') {
    //            setShow5(true);
            } else {
                console.log("ID seleccionado");
                console.log(ID);
                console.log("afuera");

                if (user.ListaCompras.find(element => element.id == ID) != null) {
                    console.log("ya existe");
                    setShow3(true);
                } else {
                    if (anterior.find(element => element.id == ID) != null) {
                        console.log("adentro");
                        user.ListaCompras.push(anterior.find(element => {
                            return element.id == ID;
                        }));
                        modificarUsuario(user);
                        setShow2(true);
                    }
                }
                console.log("encontro: ");
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log("datos");
    console.log(user);
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    return (
        <Container fluid>
            <Row>
                <Col>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <strong className="me-auto">Perfil</strong>
                        </Toast.Header>
                        <Toast.Body>¡Perfil modificado con exito!</Toast.Body>
                    </Toast>
                </Col>
            </Row>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Container fluid className="caja">
                            <Form className='perfil'>
                                <Form.Group className="mb-3" controlId="nameProfile">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" placeholder="Jose Gomez" value={(estado == true) ? user.Nombre : nombre} onChange={e => setNombre(e.target.value)} disabled={estado2 == false} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="emailProfile">
                                    <Form.Label>Correo</Form.Label>
                                    <Form.Control type="email" placeholder="JoseGomez@gmail.com" value={correo} disabled />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="phoneProfile">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control type="text" placeholder="0000-0000" value={(estado == true) ? user.Telefono : telefono} onChange={e => setTelefono(e.target.value)} disabled={estado2 == false} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addressProfile">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control type="text" placeholder="Res. Las Uvas, Tegucigalpa, Francisco Morazan" value={(estado == true) ? user.Direccion : direccion} onChange={e => setDireccion(e.target.value)} disabled={estado2 == false} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="addressProfile">
                                    <Form.Label>Fecha de creacion</Form.Label>
                                    <Form.Control type="text" placeholder="Res. Las Uvas, Tegucigalpa, Francisco Morazan" value={user.fechaCreacion} disabled />
                                </Form.Group>
                                <Button variant="primary"
                                    style={{
                                        backgroundColor: "#5AC4FF",
                                        borderColor: "#5AC4FF"
                                    }}
                                    onClick={() => EditarPerfil()}
                                >
                                    {(estado == true) ? "Editar Perfil" : "Guardar Perfil"}
                                </Button>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Toast onClose={() => setShow2(false)} show={show2} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Lista de compras</strong>
                            </Toast.Header>
                            <Toast.Body>¡Producto Agregado a la lista!</Toast.Body>
                        </Toast>
                        <Toast onClose={() => setShow3(false)} show={show3} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Lista de compras</strong>
                            </Toast.Header>
                            <Toast.Body>Este producto ya se encuentra en la lista, por favor seleccione otro</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <Row>
                    <h6>Productos comprados anteriormente</h6>
                    <Col className="d-flex justify-content-center">
                        <Row xs={1} md={4} className="g-4">
                            {Array.isArray(anterior) && Boolean(anterior.length) ? (
                                anterior.slice().map((elem, index) => {
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
                                                        }}
                                                        onClick={() => AddToCar(elem.id)}
                                                    ><img src={carrito} />Añadir</Button>
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
