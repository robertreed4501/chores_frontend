import React, {SyntheticEvent, useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {Col, Container, FloatingLabel, FormLabel, InputGroup, Row} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";
import {useNavigate} from "react-router-dom";
import {User} from "../pages/User";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

type Message = [{
    id: number
    userIdTo: number
    userIdFrom: number
    subject: string
    body: string
    sentAt: string
    readAt: string
    hasBeenRead: boolean
}]

export const NewMessageModal = () => {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [selectedConvo, setSelectedConvo] = useState<number | undefined>();
    const [messages, setMessages] = useState<Message>([{
        body: "",
        hasBeenRead: false,
        id: 0,
        readAt: "",
        sentAt: "",
        subject: "",
        userIdFrom: 0,
        userIdTo: 0
    }]);
    const [userIdTo, setUserIdTo] = useState<number | undefined>(undefined);
    const [userIdFrom, setUserIdFrom] = useState<number | undefined>(undefined);
    const [messageSubject, setMessageSubject] = useState<string>('');
    const [messageBody, setMessageBody] = useState<string>('');
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);

    const sendMessage = async () => {
        const response = await axios.post(
            "/api/messages",
            {userIdTo: userIdTo, userIdFrom: userIdFrom, subject: messageSubject, body: messageBody},
            {withCredentials: false, headers:{'key': auth.key}}
        );
        alert(response.data);
    }

    const handleSelectTo = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
        setUserIdTo(parseInt(e.currentTarget.value));
        return null;
    }

    const handleSelectFrom = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
        setUserIdFrom(parseInt(e.currentTarget.value));
        return null;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage().then( () => null);
    }


    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
        + New Message
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

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formMessageTo">
                <Form.Label>To: </Form.Label>
                <Form.Select aria-label="Default select example"
                             onChange={handleSelectTo}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessageFrom">
                <Form.Label>From - i don't need this form on here duh...</Form.Label>
                <Form.Select aria-label="Default select example"
                             onChange={handleSelectFrom}>
                    <option>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text"
                              placeholder="Enter subject"
                              onChange={(event => setMessageSubject(event.currentTarget.value))}
                />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBody">
                <Form.Label>Body</Form.Label>
                <Form.Control type="text"
                              placeholder="Type your message here"
                              onChange={(event => setMessageBody(event.currentTarget.value))}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
        Cancel
        </Button>
        <Button variant="primary" type="submit">Add User</Button>
    </Modal.Footer>
    </Modal>
    </>
);
}

