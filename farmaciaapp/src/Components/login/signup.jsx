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
import {
    obtenerUsuario,
    agregarUsuario,
    crearDocumentoUsuarios
} from "../../Firebase/usuarios";
import './login.css';

const Registro = () => {
    const user = useContext(contextoUser);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [isError, setIsError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const target = useRef(null);
    const passTarget = useRef(null);
    const [showPass, setShowPass] = useState(false);
    const [show, setShow] = useState(false);
    console.log(nombre);
    console.log(direccion);
    console.log(email);
    console.log(password);
    console.log(confirmpassword);

    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }

    useEffect(() => {
        authListener();
    }, []);

    const handleErrorMessagesSignup = (e) => {
        const emailVerification = e.target.value;
        setEmail(emailVerification);
        auth.signInWithEmailAndPassword(email).
            then(() => {
                auth.signOut();
            }
            ).catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email":
                        setEmailError("Formato de correo inválido");
                        setShow(true);
                        auth.signOut();
                        break;
                    default:
                        auth.signOut();
                        setShow(false);
                        break;
                }
            });
        //  auth.signOut();
    };

    const confirmPass = (e) => {
        const confPass = e.target.value;
        setConfirmPassword(confPass);
        if (password !== confPass) {
            setIsError("Las contraseñas no coinciden");
        } else {
            setIsError("");
        }
    };

    const handleSignup = async () => {
        clearErrors();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                //userCredential.user.sendEmailVerification();
                console.log('1');
                const createdAt = new Date();
                let usuario = {
                    UID: userCredential.user.uid,
                    Nombre: nombre,
                    Direccion: direccion,
                    fechaCreacion: createdAt
                }
                agregarUsuario(usuario);
                console.log('2');
                handleClick("/");
                //auth.signOut();
                //handleClick("/Redireccion");
            })
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                        setEmailError("Correo ya en uso");
                        setShow(!show);

                        break;
                    case "auth/invalid-email":
                        setEmailError("Formato del correo invalido");
                        setShow(!show);
                        break;
                    case "auth/weak-password":
                        setPasswordError("Constraseña corta");
                        setShowPass(!showPass);
                        break;

                    default:
                        console.log(err.code);
                        console.log(err);
                        break;
                }
            });

        //      window.location.replace("/Verificacion")
    };

    const clearErrors = () => {
        setEmailError("");
        setPasswordError("");
    };

    const clearInputs = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    const authListener = async () => {
        clearInputs();
    };

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Container fluid className="caja">
                            <Form className='formulario'>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        type="text" placeholder="Nombre completo" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicDireccion">
                                    <Form.Label>Direccion</Form.Label>
                                    <Form.Control
                                        value={direccion}
                                        onChange={(e) => setDireccion(e.target.value)}
                                        type="text" placeholder="Direccion" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => handleErrorMessagesSignup(e)}
                                        type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicEmail"
                                    ref={target}
                                    style={{
                                        marginTop: "1rem",
                                    }}
                                >
                                    {emailError ? (
                                        <Overlay
                                            target={target.current}
                                            show={show}
                                            placement="bottom"
                                        >
                                            {(props) => (
                                                <Tooltip id="overlay-email" {...props}>
                                                    {emailError}
                                                </Tooltip>
                                            )}
                                        </Overlay>
                                    ) : null}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        value={confirmpassword}
                                        //onChange={(e) => setConfirmPassword(e.target.value)}
                                        onChange={(e) => confirmPass(e)}
                                        type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="formBasicPassword"
                                >
                                    <Form.Text style={{ color: "red", marginLeft: 0 }}>
                                        {isError}
                                    </Form.Text>
                                    <Form.Text className="text-muted"></Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Form.Group className="mb-3">
                                            <Form.Text className="text-muted">
                                                ¿Ya tienes cuenta? <NavLink onClick={() => handleClick("/login")}>Iniciar sesion</NavLink>
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="primary"
                                            style={{
                                                backgroundColor: "#5AC4FF",
                                                borderColor: "#5AC4FF"
                                            }}
                                            onClick={handleSignup}
                                        >
                                            Registrarse
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Registro;
