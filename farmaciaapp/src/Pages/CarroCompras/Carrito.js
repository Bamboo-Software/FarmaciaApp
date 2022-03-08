import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

import test2 from "../../assets/ImagenTest1.jpg";
import carrito from "../../assets/compra.svg";

import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";

import "./Carrito.css";

function Carrito() {
    var amount="";
    var total=0;
    const lista = [
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 }
    ];
    return (
        <Container fluid>
            <Row>
                <p></p>
                <div className="d-flex justify-content-center">
                    <h1>Articulos </h1>
                </div>
                <Col className="d-flex justify-content-center">
                    <Row xs={1} md={4} className="g-4">
                        {Array.isArray(lista) && Boolean(lista.length) ? (
                            lista.slice().map((elem, index) => {
                                total+=elem.precio;
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
                                                    {elem.precio} lps.
                                                </Card.Text>
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <Button variant="danger" type="submit"
                                                    style={{
                                                        marginTop: "2px"
                                                    }}>Eliminar de la lista</Button>
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
                    }}><img src={carrito} />Comprar</Button>
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