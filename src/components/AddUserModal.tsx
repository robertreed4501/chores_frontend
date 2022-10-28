import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {Col, Container, FloatingLabel, FormLabel, InputGroup, Row} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";
import {useNavigate} from "react-router-dom";

type UserInfo = [{
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    key: string
    groupId: number
}]

type userAdminProps = {
    getUserInfo: () =>void;
}

export const AddUserModal = ({getUserInfo}: userAdminProps) => {



    type DashCard = [[{
        userId: any
        name: String
        chores: [[{
            done: String
            firstName: String
            multiplier: Number
            groupId: any
            assignmentId: any
            id: any
            name: String
            userId: any
        }]]
    }]]

    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<DashCard>(AdminContext);
    // @ts-ignore

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    // @ts-ignore
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        addUser().then(() => {
            return null;
        });
        handleClose();

    };

    const addUser = async () => {
        const response = await axios.post(
            "/api/register/user",
            {firstName: firstName, lastName: lastName, email: email, password: password, groupId: auth.groupId},
            { headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );
        // @ts-ignore
        response.data === "user saved" ? getUserInfo() : alert(response.data);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                + Add New User
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

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

                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                required
                                onChange={event => setPassword(event.currentTarget.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password.
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Add User</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

