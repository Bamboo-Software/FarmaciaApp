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
import {firestore} from "../../Firebase/firebase.utils";
class Medicamentos extends Component {
    constructor(props){
        super(props);
        this.state = {
            inventario: []
        }
    }
    componentDidMount() {
        setTimeout(() => {
            var projectsArr = [];
            firestore.collection('productos').get().then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    let project = doc.data();
                    projectsArr.push(project);
                });
                this.setState({
                    inventario: projectsArr
                });
            });

        }, 300)//fin del timer
    }//fin de DidMount
    render(){
        const  data = this.state.inventario
       
    if (!data) { return <div>Loading...</div> }
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
                        >Medicamentos</h1>
                    </Col>
                </Row>

                <Col className="d-flex justify-content-center">
                    <Row xs={4} md={4} className="g-4">
                        {Array.isArray(data) && Boolean(data.length) ? (
                            data.slice().map((elem, index) => {
                                return (
                                    <Card className="tarjetita">
                                        <div className="card-img-top">
                                            <Card.Img className="w-100" variant="top" src={elem.imagen} />
                                        </div>
                                        <Card.Body>
                                            <div className="d-flex justify-content-center">
                                                <a style={{fontWeight:"bold"}}>{elem.nombre}</a>

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
               
                <p></p>
            </Container>
        </div>
    );
                        }
}

export default Medicamentos;