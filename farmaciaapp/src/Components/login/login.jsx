import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { NavLink } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import './login.css';
function Signup() {
    const navigate = useNavigate();
    function handleClick(path) {
        navigate(path);
    }
    return (
        <div>
            <Form className='formulario'> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Text className="text-muted">
                        <h8>Aun no tienes cuenta? <NavLink onClick={()=> handleClick("/Signup")}>Registrate</NavLink></h8>
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Entrar
                </Button>
            </Form>
        </div>
    )
}

export default Signup;