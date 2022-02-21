import Form from 'react-bootstrap/Form';
import React, { Component } from 'react'
import { NavLink } from 'react-bootstrap';

export default class Login extends Component {
    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Nombre Completo</Form.Label>
                        <Form.Control type="text" placeholder="Nombre completo" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDireccion">
                        <Form.Label>Direccion</Form.Label>
                        <Form.Control type="text" placeholder="Direccion" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Text className="text-muted">
                            Aun no tienes cuenta? <NavLink>Registrate</NavLink>
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}
