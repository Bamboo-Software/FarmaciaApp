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
import basurero from "../../assets/basurero.svg";
import imgSiguiente from "../../assets/next.svg";
import imgAnterior from "../../assets/before.svg";
import { ButtonGroup } from "react-bootstrap";
import { obtenerHigiene, obtenerMascarilla, obtenerProductos } from "../../Firebase/productos";
import { obtenerUsuario, modificarUsuario } from "../../Firebase/usuarios";
import { firestore } from "../../Firebase/firebase.utils";
import Toast from 'react-bootstrap/Toast';
import { auth } from "../../Firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { User } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";

function Home({ sendText, recieveText }) {
    /*const busquedaDefault =
    {
        'nombre': ''
    };
    
    const [busquedaAvanzada, setBusquedaAvanzada] = React.useState(busquedaDefault);*/
    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
    }
    const populares = [
        { imagen: test2, nombre: "Pastilla para la gripe", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe2", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe3", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe4", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe5", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe6", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe7", precio: 20 },
        { imagen: test2, nombre: "Pastilla para la gripe8", precio: 20 }
    ];
    const [texto, setTexto] = useState("Añadir");
    const [estadoBoton, setEstadoBoton] = useState(true);
    const prueba = { sendText };
    const MostPopular = [];
    //const [prueba, setPrueba] = useState({ sendText });
    // const prueba = "Sukrol";
    console.log("desde padre: ");
    //console.log(props.data);
    console.log(prueba.sendText);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [productos, setProductos] = useState([]);
    const [Active, setActive] = useState([]);
    const [higiene, setHigiene] = useState([]);
    const [mascarillas, setMascarillas] = useState([]);
    const [cont, setCont] = useState(0);
    const [numeroPaginas, setNumeroPaginas] = useState(0);
    //  const [busqueda, setBusqueda] = react
    const [cont2, setCont2] = useState(0);
    const [numeroPaginas2, setNumeroPaginas2] = useState(0);

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

    useEffect(() => {
        obtenerProductos().then(lista => {
            setProductos(lista);
            let arreglo = lista;
            console.log(arreglo);
            const Nombre = prueba.sendText;
            if (!(Nombre === ""))
                arreglo = arreglo.filter((elemento) => {
                    return elemento.nombre.toLowerCase().includes(Nombre.toLowerCase());
                });
            console.log(" producto ", arreglo);
            setProductos(arreglo);

        });
        obtenerHigiene().then(lista => {
             setHigiene(lista);
             let arreglo = lista;
             console.log(arreglo);
             const Nombre = prueba.sendText;
             if (!(Nombre === ""))
                 arreglo = arreglo.filter((elemento) => {
                     return elemento.nombre.toLowerCase().includes(Nombre.toLowerCase());
                 });
             console.log("Higiene ",arreglo);
             setHigiene(arreglo);
         });
         obtenerMascarilla().then(lista => {
             setMascarillas(lista);
             let arreglo = lista;
             
             console.log(arreglo);
             const Nombre = prueba.sendText;
             if (!(Nombre === ""))
                 arreglo = arreglo.filter((elemento) => {
                     return elemento.nombre.toLowerCase().includes(Nombre.toLowerCase());
                 });
             console.log(arreglo);
             setMascarillas(arreglo);
         });
    }, [sendText]);

    useEffect(() => {
        auth.onAuthStateChanged(userAuth => {
            obtenerUsuario(!!userAuth ? userAuth.uid : null)
                .then(usuario => {
                    console.log("Entre a usuario")
                    const ref = usuario;
                    console.log(ref);
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
                    console.log("Quiebro aca")
                    console.log(err);
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

    //   console.log(productos);
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

    const siguiente2 = (e) => {
        e.preventDefault();
        if ((numeroPaginas2 * 3) < (Math.ceil(populares.length / 3))) {
            setNumeroPaginas2(numeroPaginas2 + 1);
            setCont2(cont2 + 3);
        } else {
            setCont2(0);
            setNumeroPaginas2(0);
        }
    }

    const anterior2 = (e) => {
        e.preventDefault();
        if (cont2 - 3 >= 0) {
            setCont2(cont2 - 3);
            setNumeroPaginas2(numeroPaginas2 - 1);
        }
    }

    const siguienteAnteriorBttn2 = () => {
        if (populares.length > 3) {
            return (<div className="mt-4 mx-4">
                <ButtonGroup>
                    <Button onClick={anterior2} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-anterior" src={imgAnterior} /></Button>
                    <Button onClick={siguiente2} className="btn btn-light bttn-anterior-despues-promo"><img className="imagen-bttn-promo-siguiente" src={imgSiguiente} /></Button>
                </ButtonGroup>
            </div>);
        }
    }

    function AddToCar(ID) {
        try {
            if (user.UID == '') {
                console.log("no esta logeado");
                setShow5(true);
            } else {
                console.log("ID seleccionado");
                console.log(ID);
                console.log("afuera");
                if (user.ListaCompras.find(element => element.id == ID) != null) {
                    console.log("ya existe");
                    setShow2(true);
                    setShow4(true);
                } else {
                    if (productos.find(element => element.id == ID) != null) {
                        console.log("adentro");
                        user.ListaCompras.push(productos.find(element => {
                            return element.id == ID;
                        }));
                        //  recieveText(user.ListaCompras.length);
                        modificarUsuario(user);
                        setShow(true);
                    }
                    if (mascarillas.find(element => element.id == ID) != null) {
                        console.log("adentro");
                        user.ListaCompras.push(mascarillas.find(element => {
                            return element.id == ID;
                        }));
                        //   recieveText(user.ListaCompras.length);
                        modificarUsuario(user);
                        setShow3(true);
                    }

                    if (higiene.find(element => element.id == ID) != null) {
                        console.log("adentro");
                        user.ListaCompras.push(higiene.find(element => {
                            return element.id == ID;
                        }));
                        //    recieveText(user.ListaCompras.length);
                        modificarUsuario(user);
                        setShow3(true);
                    }
                }

            }
            console.log("encontro: ");
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    if (!productos) { return <div>Loading...</div> } else {
        productos.forEach((elem) => {
            if (elem.unidades_vendidas > 10)
                MostPopular.push(elem)
        })
        mascarillas.forEach((elem) => {
            if (elem.unidades_vendidas > 10)
                MostPopular.push(elem)
        })
        higiene.forEach((elem) => {
            if (elem.unidades_vendidas > 10)
                MostPopular.push(elem)
        })

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
                        <Col>
                            <Toast onClose={() => setShow5(false)} show={show5} delay={3000} autohide>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Lista de compras</strong>
                                </Toast.Header>
                                <Toast.Body>Por favor inicie sesion o registrese</Toast.Body>
                            </Toast>
                            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Lista de compras</strong>
                                </Toast.Header>
                                <Toast.Body>¡Producto Agregado a la lista!</Toast.Body>
                            </Toast>
                            <Toast onClose={() => setShow2(false)} show={show2} delay={3000} autohide>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Lista de compras</strong>
                                </Toast.Header>
                                <Toast.Body>Este producto ya se encuentra en la lista, por favor seleccione otro</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
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
                    <div className="d-flex justify-content-center">
                        <Row xs={2} md={5} className="g-4">
                            {Array.isArray(productos) && Boolean(productos.length) ? (
                                productos.slice(cont, cont + 5).map((elem, index) => {
                                    return (
                                        <Card className="tarjetita" key={index.toString()}>
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
                                                            backgroundColor: (estadoBoton == true) ? "#89E9A9" : "#dc3545",
                                                            borderColor: (estadoBoton == true) ? "#89E9A9" : "#dc3545",
                                                            color: (estadoBoton == true) ? "#000000" : "#ffffff",
                                                        }}
                                                        onClick={() => AddToCar(elem.id)}
                                                    >
                                                        <img src={(estadoBoton == true) ? carrito : basurero} /> {texto}
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
                    </div>
                    <p></p>

                </Container>

                <Container fluid>
                    <Row>
                        <Col>
                            <Toast onClose={() => setShow3(false)} show={show3} delay={3000} autohide>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Lista de compras</strong>
                                </Toast.Header>
                                <Toast.Body>¡Producto Agregado a la lista!</Toast.Body>
                            </Toast>
                            <Toast onClose={() => setShow4(false)} show={show4} delay={3000} autohide>
                                <Toast.Header>
                                    <img
                                        src="holder.js/20x20?text=%20"
                                        className="rounded me-2"
                                        alt=""
                                    />
                                    <strong className="me-auto">Lista de compras</strong>
                                </Toast.Header>
                                <Toast.Body>Este producto ya se encuentra en la lista, por favor seleccione otro</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                    <p></p>
                    <Row>
                        <Col className="d-flex justify-content-start">
                            <h1
                                style={{
                                    fontSize: "28px",
                                    fontFamily: "Roboto"
                                }}
                            >Populares</h1>
                        </Col>
                    </Row>
                    <Row>
                        <div className="d-flex justify-content-start">
                            {siguienteAnteriorBttn2()}
                        </div>
                    </Row>
                    <Col className="d-flex justify-content-center">
                        <Row xs={2} md={5} className="g-4">
                            {Array.isArray(MostPopular) && Boolean(MostPopular.length) ? (
                                MostPopular.slice(cont2, cont2 + 5).map((elem, index) => {
                                    return (
                                        <Card className="tarjetita" key={index.toString()}>
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
                                                            backgroundColor: (estadoBoton == true) ? "#89E9A9" : "#dc3545",
                                                            borderColor: (estadoBoton == true) ? "#89E9A9" : "#dc3545",
                                                            color: (estadoBoton == true) ? "#000000" : "#ffffff",
                                                        }}
                                                        className=""
                                                        onClick={() => AddToCar(elem.id)}
                                                    >
                                                        <img src={(estadoBoton == true) ? carrito : basurero} /> {texto}
                                                    </Button>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    );
                                })
                            ) : (
                                <div className="d-flex justify-content-center">
                                    <h1 className="text-center">
                                        Lo siento, aun no hay populares :c
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
}

export default Home;
