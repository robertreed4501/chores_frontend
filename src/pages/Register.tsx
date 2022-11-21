import React, {useState} from "react";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "../api/axios";

export const Register = () => {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    // @ts-ignore
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            return null;
        } else {
            event.preventDefault();
            setValidated(true);
            registerUser().then(() => {
                return null;
            });
        }



    };

    const registerUser = async () => {
        const response = await axios.post(
            "/api/register",
            {firstName: firstName, lastName: lastName, email: email, password: password},
            { headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );

        alert(response.data);
        response.data === "registered" ? navigate("/") : setEmail('');
    }



    return (
        <Container>
            <Row className="mb-3 justify-content-md-center">
                <Col md="auto">
                    <h2>Sign up</h2>
                </Col>
            </Row>
            <Row className="mb-3 justify-content-md-center">
                <Col md="4">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="First name"
                                    defaultValue=""
                                    onChange={event => setFirstName(event.currentTarget.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom02">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Last name"
                                    defaultValue=""
                                    onChange={event => setLastName(event.currentTarget.value)}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                                <Form.Label>Email address</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="email"
                                        placeholder="Email address"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={event => setEmail(event.currentTarget.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    minLength={8}
                                    onChange={event => setPassword(event.currentTarget.value)}/>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid password.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button type="submit">Sign Up</Button>
                    </Form>
                </Col>

            </Row>
        </Container>
    );
}