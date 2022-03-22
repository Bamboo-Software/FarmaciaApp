import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";

function Contacto() {
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }
    return (
        <>
            <div className="d-flex justify-content-around align-items-center Fondo-menubar">
                <Container fluid>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <div>
                                <a style={{
                                    color: "#FFFFFF"
                                }}>Nuestras formas de contacto:</a>
                                <a style={{
                                    color: "#FFFFFF"
                                }}>farmaciaapp@gmail.com</a>
                                <a style={{
                                    color: "#FFFFFF"
                                }}>+504 9587-5449</a>
                                <a style={{
                                    color: "#FFFFFF"
                                }}>2679-8834</a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}
/* */
export default Contacto;