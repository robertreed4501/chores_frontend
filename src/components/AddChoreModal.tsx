import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {InputGroup} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";

type AddChoreModalProps = {
    getChoreList: (groupId: number | undefined) => void;
}


export const AddChoreModal = (props: AddChoreModalProps) => {

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
    const [multiplier, setMultiplier] = useState(1);

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<DashCard>(AdminContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddChore = async () => {
        const response = await axios.post(
            "/api/chores",
            {name: choreName, description: description, multiplier: multiplier, userGroupId: auth.groupId},
            {withCredentials: false, headers:{'key': auth.apiKey}}
        );
        // @ts-ignore
        setDashboard(response.data);
        setShow(false);
        props.getChoreList(auth.groupId);
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
                        <Form.Group className="mb-3">
                            <Form.Label>Chore Name: </Form.Label>

                                <Form.Control
                                    type="text"
                                    placeholder="Enter New Chore"
                                    value={choreName}
                                    onChange={e => setChoreName(e.target.value)}
                                    className=""
                                />
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description: </Form.Label>
                            <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    className=""
                                    onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Label>Times per Week</Form.Label>
                        <InputGroup size="lg" className="w-50 m-3">

                            <Button onClick={() => setMultiplier(multiplier - 1)}>-</Button>
                            <Form.Control
                                type="text"
                                value={multiplier}

                            />
                            <Button onClick={() => setMultiplier(multiplier + 1)}>+</Button>
                        </InputGroup>

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

