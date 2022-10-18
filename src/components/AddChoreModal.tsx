import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {FloatingLabel, FormLabel} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";

export const AddChoreModal = () => {

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
    const [choreName, setChoreName] = useState('');
    const [description, setDescription] = useState('');

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<DashCard>(AdminContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddChore = async () => {
        alert(choreName);
        const response = await axios.post(
            "/api/chores",
            {name: choreName, scope: "personal", userGroupId: auth.groupId},
            {withCredentials: false, headers:{'key': auth.apiKey}}
        );
        // @ts-ignore
        setDashboard(response.data);
        setShow(false);
    }

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow}>
                + Create New Chore
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Chore</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <>
                            <FormLabel
                                controlId="choreNameText"
                                label="Chore Name"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Enter New Chore"
                                    onChange={e => setChoreName(e.target.value)}
                                />
                            </FormLabel>
                            <FloatingLabel controlId="floatingTextarea2" label="Description">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </FloatingLabel>
                        </>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddChore}>Add Chore</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

