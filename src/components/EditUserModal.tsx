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

type EditUserProps = {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    getUserInfo: () => void
}

export const EditUserModal = (props: EditUserProps) => {



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
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(props.role);

    console.log(role + " - useState");
    console.log(props.role + " props.role")
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
        saveUser().then(() => {
            return null;
        });
        handleClose();

    };

    const saveUser = async () => {
        const response = await axios.post(
            "/api/user/update",
            {id: props.id, firstName: firstName, lastName: lastName, email: email, role: role, groupId: auth.groupId},
            { headers: { 'Content-Type': 'application/json' },
                withCredentials: false
            }
        );
        // @ts-ignore
        response.data === "user updated" ? props.getUserInfo() : alert(response.data);
    }

    // @ts-ignore
    const handleSwitch = (event) => {
        event.target.checked ? setRole('ADMIN') : setRole('USER');
        console.log(role);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                Edit
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="First name"
                                defaultValue={props.firstName}
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
                                defaultValue={props.lastName}
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
                                    defaultValue={props.email}
                                    onChange={event => setEmail(event.currentTarget.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email address.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>


                             
                        <Form.Group as={Col} md="12" controlId="validationCustom03" hidden={props.role==='OWNER'}>
                            <Form.Label>Role</Form.Label>
                            <Form.Switch
                                label="Grant Admin Privileges"
                                checked={role==='ADMIN'}
                                onChange={handleSwitch}/>
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
                    <Button variant="primary" onClick={handleSubmit}>Update User</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

