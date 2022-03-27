import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { obtenerUsuario, modificarUsuario } from "../../Firebase/usuarios";
import test2 from "../../assets/ImagenTest1.jpg";
import carrito from "../../assets/compra.svg";
import { auth } from "../../Firebase/firebase.utils";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import imgSiguiente from "../../assets/next.svg";
import imgAnterior from "../../assets/before.svg";
import { ButtonGroup } from "react-bootstrap";
import "./Carrito.css";
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";

function Carrito() {
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    var amount = "";
    var total = 0;
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

    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }

    const [cont, setCont] = useState(0);
    const [numeroPaginas, setNumeroPaginas] = useState(0);

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            obtenerUsuario(!!userAuth ? userAuth.uid : null)
                .then(usuario => {
                  //  console.log("Entre a usuario")
                    const ref = usuario;
                  //  console.log(ref);
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
                .catch((err) => {
                   // console.log("Quiebro aca")
                   // console.log(err);
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
    /*const lista = [
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 }
    ];*/
    const lista = user.ListaCompras;
    const siguiente = (e) => {
        e.preventDefault();
        if ((numeroPaginas * 3) < (Math.ceil(lista.length / 3))) {
            setNumeroPaginas(numeroPaginas + 1);
            setCont(cont + 3);
        } else {
            setCont(0);
            setNumeroPaginas(0);
        }
    }

    const anterior = (e) => {
        e.preventDefault();
        if (cont - 3 >= 0) {
            setCont(cont - 3);
            setNumeroPaginas(numeroPaginas - 1);
        }
    }

   // console.log("total");
   // console.log(total);

    function irCompra() {
        if (lista.length == 0) {
            setShow3(true);
        } else {
            handleClick("/Pago");
        }
    }

    const siguienteAnteriorBttn = () => {
        if (lista.length > 3) {
            return (<div className="mt-4 mx-4">
                <ButtonGroup>
                    <Button onClick={anterior} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-anterior" src={imgAnterior} /></Button>
                    <Button onClick={siguiente} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-siguiente" src={imgSiguiente} /></Button>
                </ButtonGroup>
            </div>);
        }
    }
    function eliminarArticulo(ID) {
        user.ListaCompras = lista.filter(element => {
            return element.id !== ID;
        });
        modificarUsuario(user);
        setShow2(true);
        //console.log("resultado");
        //console.log(user);
    };
    return (
        <Container fluid>
            <Row>
                <p></p>
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
                            <Toast.Body>¡Producto eliminado con exito!</Toast.Body>
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
                            <Toast.Body>Carro vacio, agregue productos por favor</Toast.Body>
                        </Toast>
                    </Col>
                </Row>
                <p></p>
                <div className="d-flex justify-content-center">
                    <h1>Articulos </h1>
                </div>
                <p></p>
                <div className="d-flex justify-content-center">
                    <Col className="d-flex justify-content-center">
                        <Row xs={2} md={4} className="g-4">
                            {Array.isArray(lista) && Boolean(lista.length) ? (
                                lista.slice().map((elem, index) => {
                                    total += elem.precio;
                                    return (
                                        <Card className="tarjeta" key={index.toString}>
                                            <div className="card-img-top">
                                                <Card.Img className="w-100" variant="top" src={elem.imagen} />
                                            </div>
                                            <Card.Body>
                                                <div className="d-flex justify-content-center">
                                                    <Card.Title>{elem.nombre}</Card.Title>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Card.Text>
                                                        {elem.precio} lps.
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Button variant="danger" type="submit"
                                                        style={{
                                                            marginTop: "2px"
                                                        }}
                                                        onClick={() => eliminarArticulo(elem.id)}
                                                    >Eliminar de la lista</Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h1 className="text-center">
                                        Aun no hay articulos en el carro :c
                                    </h1>
                                </div>
                            )}
                        </Row>
                    </Col>
                </div>
            </Row>
            <p></p>
            <div className="d-flex justify-content-center">
                <h1>Total: {total} lps.</h1>
            </div>
            <p></p>
            <div className="d-flex justify-content-center">
                <Button variant="primary" type="submit"
                    style={{
                        width: "154px",
                        height: "40px",
                        backgroundColor: "#89E9A9",
                        borderColor: "#89E9A9",
                        color: "#000000"
                    }}
                    onClick={() => irCompra()}
                ><img src={carrito} />Comprar</Button>
            </div>
            <p></p>
        </Container >
    );
}
/*                                            <div className="d-flex justify-content-center">
                                                <Button variant="primary" type="submit"
                                                    style={{
                                                        width: "154px"
                                                    }}>Buscar</Button>
                                            </div>*/

export default Carrito;