import React, { useState, useEffect, Component } from "react";
import "./Inicio.css";
import Button from "react-bootstrap/Button";
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import test from "../../assets/test1.jpg";
import test2 from "../../assets/ImagenTest1.jpg";
import carrito from "../../assets/compra.svg";
import getProductos from "./getProductos";
import imgSiguiente from "../../assets/next.svg";
import imgAnterior from "../../assets/before.svg";
import { ButtonGroup } from "react-bootstrap";
import { obtenerHigiene, obtenerMascarilla, obtenerProductos } from "../../Firebase/productos";
import {firestore} from "../../Firebase/firebase.utils";

function Mascarillas() {
    const [productos, setProductos] = useState([]);
    const [cont, setCont] = useState(0);
    const [numeroPaginas, setNumeroPaginas] = useState(0);

    const [cont2, setCont2] = useState(0);
    const [numeroPaginas2, setNumeroPaginas2] = useState(0);

    useEffect(() => {
        obtenerMascarilla().then(lista => {
            setProductos(lista);
        });
    }, []);

    console.log(productos);

    const siguiente = (e) => {
        e.preventDefault();
        if ((numeroPaginas * 3) < (Math.ceil(productos.length / 3))) {
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

    const siguienteAnteriorBttn = () => {
        if (productos.length > 3) {
            return (<div className="mt-4 mx-4">
                <ButtonGroup>
                    <Button onClick={anterior} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-anterior" src={imgAnterior} /></Button>
                    <Button onClick={siguiente} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-siguiente" src={imgSiguiente} /></Button>
                </ButtonGroup>
            </div>);
        }
    }

    if (!productos) { return <div>Loading...</div> }
    return (
        <div>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <div className="carousel">
                                <img
                                    className="d-block w-100"
                                    src={test}
                                    alt="First slide"
                                />
                            </div>

                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="carousel">
                                <img
                                    className="d-block w-100"
                                    src={test}
                                    alt="First slide"
                                />
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="carousel">
                                <img
                                    className="d-block w-100"
                                    src={test}
                                    alt="First slide"
                                />
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Container fluid>
                <p></p>
                <Row>
                    <Col className="d-flex justify-content-start">
                        <h1
                            style={{
                                fontSize: "28px",
                                fontFamily: "Roboto"
                            }}
                        >Novedades</h1>
                    </Col>
                </Row>
                <Row>
                    <div className="d-flex justify-content-start">
                        {siguienteAnteriorBttn()}
                    </div>
                </Row>
                <Col className="d-flex justify-content-center">
                    <Row xs={2} md={5} className="g-4">
                        {Array.isArray(productos) && Boolean(productos.length) ? (
                            productos.slice(cont, cont + 5).map((elem, index) => {
                                return (
                                    <Card className="tarjetita">
                                        <div className="card-img-top">
                                            <Card.Img className="w-100" variant="top" src={elem.imagen} />
                                        </div>
                                        <Card.Body>
                                            <div className="d-flex justify-content-center">
                                                <a style={{ fontWeight: "bold" }}>{elem.nombre}</a>

                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <p>
                                                    {elem.precio} lps.
                                                </p>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <Button
                                                    style={{
                                                        backgroundColor: "#89E9A9",
                                                        borderColor: "#89E9A9",
                                                        color: "#000000"
                                                    }}
                                                >
                                                    <img src={carrito} />
                                                    Añadir
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                );
                            })
                        ) : (
                            <div className="d-flex justify-content-center">
                                <h1 className="text-center">
                                    Lo siento, aun no hay novedades :c
                                </h1>
                            </div>
                        )}
                    </Row>
                </Col>
                <p></p>

            </Container>
        </div>
    );
}

export default Mascarillas;