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
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import Toast from 'react-bootstrap/Toast';
import "./Pago.css";
import {
    obtenerUsuario,
    modificarUsuario
} from "../../Firebase/usuarios";
import { findByPlaceholderText } from '@testing-library/react';

function Pago() {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [extra, setExtra] = useState("");
    const [validar, setValidar] = useState(true);
    const [show, setShow] = useState(false);
    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    function handleClick(path) {
        navigate(path);
    }



    const [user2, setUser2] = useState({
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
                    setUser2({
                        Nombre: !!userAuth ? ref.Nombre : "",
                        //                  correo: userAuth.email,
                        fechaCreacion: !!userAuth ? ref.fechaCreacion.toDate() : "",
                        UID: !!userAuth ? ref.UID : "",
                        ListaCompras: !!userAuth ? ref.ListaCompras : [],
                        ListaAnterior: !!userAuth ? ref.ListaAnterior : [],
                        Direccion: !!userAuth ? ref.Direccion : "",
                        Telefono: !!userAuth ? (ref.Telefono ? ref.Telefono : "") : ""
                    });
                    console.log(user2.ListaCompras.length);
                })
                .catch((err) => {
                    console.log("Quiebro aca")
                    console.log(err);
                    setUser2({
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

    /*const [pago, setPago] = useState({
        Nombre: nombre,
        ID: user2.UID,
        Direccion: user2.Direccion,
        extra: extra
    });*/
    function RealizarCompra() {
        try {
            console.log("entra");
            if (nombre == "") {
                // setValidar(false);
                setShow(true);
            } else {
                user2.ListaAnterior = user2.ListaCompras;
                user2.ListaCompras = [];
                console.log(user2);
                let pago = {
                    Nombre: nombre,
                    ID: user2.UID,
                    Direccion: user2.Direccion,
                    extra: extra
                }
                console.log(pago);
                agregarPago(pago);
                modificarUsuario(user2);
                handleClick("/Redireccion");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Container fluid>
                <p></p>
                <Row>
                    <Col>
                        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">Pagos</strong>
                            </Toast.Header>
                            <Toast.Body>Por favor ingrese los datos correctamente</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <p></p>
                <Row>
                    <Col className="d-flex justify-content-center">

                        <Container fluid className="caja2">
                            <p></p>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <h1 style={{
                                        fontSize: "18px",
                                        marginTop: "20px"
                                    }}> Por favor introduzca su informacion de pago</h1>
                                </Col>
                            </Row>
                            <p></p>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <PaymentInputsWrapper {...wrapperProps}>
                                        <svg {...getCardImageProps({ images })} />
                                        <input {...getCardNumberProps()} />
                                        <input {...getExpiryDateProps()} />
                                        <input {...getCVCProps()} />
                                    </PaymentInputsWrapper>
                                </Col>
                            </Row>
                            <p></p>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control
                                            style={{
                                                width: "330px"
                                            }}
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            type="text" placeholder="Nombre" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Form.Group className="mb-3" controlId="formBasicName">
                                        <Form.Label>Informacion extra</Form.Label>
                                        <Form.Control
                                            style={{
                                                width: "330px"
                                            }}
                                            value={extra}
                                            onChange={(e) => setExtra(e.target.value)}
                                            type="text" placeholder="Informacion extra (Opcional)" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <p></p>
                            <Row>
                                <Col className="d-flex justify-content-center">
                                    <Button variant="primary"
                                        style={{
                                            backgroundColor: "#5AC4FF",
                                            borderColor: "#5AC4FF",
                                            marginBottom: "20px"
                                        }}
                                        onClick={() => RealizarCompra()}
                                    >
                                        Realizar compra
                                    </Button>
                                </Col>
                            </Row>
                            <p></p>
                            <p></p>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
/*<Form className='formulario'>
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
                            </Form>*/
export default Pago;