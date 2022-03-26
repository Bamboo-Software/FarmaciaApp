import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from 'react-bootstrap';
import { Col, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import telefono from "../../assets/phoneNormal.svg";
import mail from "../../assets/mail.svg";
import fijo from "../../assets/phone.svg";
import contact from "../../assets/contact.svg";
import "./Contacto.css";

function Contacto() {
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }
    return (
        <>
            <footer className="d-flex justify-content-around align-items-center Fondo-menubar2">
                <Container fluid>
                    <Row>
                        <Col className="d-flex justify-content-center">
                            <div>
                                <div className="d-flex justify-content-center">
                                    <a><img src={contact} /></a>
                                    <a style={{
                                        color: "#FFFFFF"
                                    }}>Nuestras formas de contacto:</a>
                                </div>
                                <p></p>
                                <div className="d-flex justify-content-center">
                                    <a><img src={mail} /></a>
                                    <a style={{
                                        color: "#FFFFFF"
                                    }}>farmaciaapp@gmail.com</a>
                                    <a><img src={telefono} /></a>
                                    <a style={{
                                        color: "#FFFFFF"
                                    }}>+504 9587-5449</a>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <a><img src={fijo} /></a>
                                    <a style={{
                                        color: "#FFFFFF"
                                    }}>2679-8834</a>
                                    <a></a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
}
/* */
export default Contacto;