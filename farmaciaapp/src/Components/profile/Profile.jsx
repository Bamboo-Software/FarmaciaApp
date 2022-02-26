import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import CardGroup from 'react-bootstrap/CardGroup';
import { useNavigate } from "react-router-dom";
import './Profile.css';
function Profile() {
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    return (
        <div className='contenedorUser'>
            <div>
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
                    <Button variant="info" type="submit">
                        Editar perfil
                    </Button>
                </Form>
            </div>
            <div>
                <h6>Medicamentos favoritos</h6>
                <Row xs={1} md={2} className="g-4">

                    <Card>
                        <Card.Img variant="top" src="https://i0.wp.com/sunwahpanama.com/wp-content/uploads/2020/05/PANADOL-ULTRA.jpg?resize=256%2C256&ssl=1" />
                        <Card.Body>
                            <Card.Title>Panadol</Card.Title>
                            <Card.Text>
                                Panadol de 300 gr.
                            </Card.Text>
                            <Button variant="primary">Buscar</Button> <Button variant="danger">Eliminar de favoritos</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="https://images.rappi.com/products/f0d353d4-1777-4dd3-a6a7-f2bb558d2228.png?d=200x200&e=webp" />
                        <Card.Body>
                            <Card.Title>Aspirina</Card.Title>
                            <Card.Text>
                                Aspirina para adultos de 500 gr
                            </Card.Text>
                            <Button variant="primary">Buscar</Button> <Button variant="danger">Eliminar de favoritos</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Sudagrip</Card.Title>
                            <Card.Text>
                                Sudagrip de 50 gr
                            </Card.Text>
                            <Button variant="primary">Buscar</Button> <Button variant="danger">Eliminar de favoritos</Button>
                        </Card.Body>
                    </Card>
                    <Card>
                        <Card.Img variant="top" src="holder.js/100px160" />
                        <Card.Body>
                            <Card.Title>Glokemina</Card.Title>
                            <Card.Text>
                                Me lo invente
                            </Card.Text>
                            <Button variant="primary">Buscar</Button> <Button variant="danger">Eliminar de favoritos</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
    )
}

export default Profile;
