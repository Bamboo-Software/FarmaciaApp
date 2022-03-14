import Form from 'react-bootstrap/Form';
import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from 'react-bootstrap';
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import { auth, signInWithGoogle } from "../../Firebase/firebase.utils";
import { contextoUser } from "../../contexto/contexto";
import './login.css';


function Login() {
    const navigate = useNavigate();
    const user = useContext(contextoUser);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const passTarget = useRef(null);

    function handleClick(path) {
        navigate(path);
    }

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };

    const clearErrors = () => {
        setShow(false);
        setShowPass(false);
        setEmailError("");
        setPasswordError("");
    };

    const handleErrorMessagesLogin = (e) => {
        const emailVerification = e.target.value;
        setEmail(emailVerification);
        auth.signInWithEmailAndPassword(email, password).catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                    setEmailError("Formato de correo inválido");
                    setShow(true);

                    break;
                case "auth/user-disabled":
                    setEmailError("Su correo se ha deshabilitado");
                    setShow(true);
                    break;
                default:
                    setShow(false);
                    break;
            }
        });
        /*  auth.onAuthStateChanged(function (user) {
            if (user) {
              if (user.emailVerified === false) {
                console.log("Email No verificado");
                auth.signOut();
                handleClick();
                //setAviso = true;
                // window.location.reload();
              } else {
                console.log("Email verified");
                // successful login
              }
            } else {
              //  Toast.show({ text: 'Something Wrong!', position: 'bottom', buttonText: 'No user is signed in.' });
            }
          });*/
    };

    const handleLogin = async () => {
        clearErrors();
        auth.signInWithEmailAndPassword(email, password).then(
            ()=>{
                handleClick("/");
            }
        )
        .catch((err) => {
            switch (err.code) {
                case "auth/invalid-continue-uri":
                    break;
                case "auth/invalid-email":
                    setEmailError("Formato de correo inválido");
                    setShow(!show);

                    break;
                case "auth/user-disabled":
                    setEmailError("Su correo se ha deshabilitado");
                    setShow(!show);
                    break;
                case "auth/user-not-found":
                    setEmailError("Correo o Contraseña incorrecto");
                    setShow(!show);

                    break;
                case "auth/wrong-password":
                    setPasswordError("Correo o Contraseña incorrecto");
                    setShowPass(!showPass);
                    break;

                default:
                    console.log(err);
                    break;
            }
        });
        if (password === "") {
            setPasswordError("No introdujo la contraseña");
            setShowPass(!showPass);
        }
        /*auth.onAuthStateChanged(function (user) {
            if (user) {
                if (user.emailVerified === false) {
                    //setAviso = true;
                    console.log("Email No verificado");
                    auth.signOut();
                    handleClick();
                    // setAviso = true;
                } else {
                    crearDocumentoUsuarios({});
                    console.log("Email verified");
                    // successful login
                }
            } else {
                //  Toast.show({ text: 'Something Wrong!', position: 'bottom', buttonText: 'No user is signed in.' });
            }
        });*/
        console.log(password);
    };

    const authListener = async () => {
        clearInputs();
        /*auth.onAuthStateChanged(user => {
          if (user) {
            clearInputs();
            setUser(user);
          } else {
            setUser("");
          }
        });*/
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Container fluid className="caja">
                            <Form className='formulario'>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={(e) => handleErrorMessagesLogin(e)}
                                        onClick={(e) => clearErrors()}
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
                                        onChange={(e)=>setPassword(e.target.value)}
                                        onClick={(e)=>clearErrors()}
                                        type="password" placeholder="Password" />
                                </Form.Group>
                                {passwordError ? (
                                    <Overlay
                                        target={passTarget.current}
                                        show={showPass}
                                        placement="bottom"
                                    >
                                        {(props) => (
                                            <Tooltip id="overlay-password" {...props}>
                                                {passwordError}
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                ) : null}
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Form.Group className="mb-3" >
                                            <Form.Text className="text-muted">
                                                <a>¿Aun no tienes cuenta?</a>
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <NavLink
                                            style={
                                                {
                                                    marginTop: "-1rem",
                                                    marginBottom: "1rem"
                                                }
                                            }
                                            onClick={() => handleClick("/Signup")}> Registrate</NavLink>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="d-flex justify-content-center">
                                        <Button variant="primary"
                                            onClick={handleLogin}
                                            style={{
                                                backgroundColor: "#5AC4FF",
                                                borderColor: "#5AC4FF"
                                            }}>
                                            Entrar
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

export default Login;
