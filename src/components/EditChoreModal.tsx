import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {FloatingLabel, FormLabel, InputGroup} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";

type ChoreListType = [{
    id: number
    name: string
    choreLevel: "EASY" | "MEDIUM" | "HARD"
    multiplier: number
    scope: "PERSONAL" | "GROUP"
    selected: boolean
    description: string
}]

type editChoreProps = {
    id: number
    name: string
    multiplier: number
    description: string
    setNewChoreList: (choreList: ChoreListType) => void
}

export const EditChoreModal = (props: editChoreProps) => {

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
    const [choreName, setChoreName] = useState(props.name);
    const [description, setDescription] = useState(props.description);
    const [multiplier, setMultiplier] = useState(props.multiplier);

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<DashCard>(AdminContext);

    const handleClose = () => {
        setShow(false);
        setChoreName(props.name);
        setDescription(props.description);
        setMultiplier(props.multiplier);
    }
    const handleShow = () => setShow(true);

    const handleUpdateChore = async () => {
        const response = await axios.post(
            "/api/chores/update",
            {id: props.id, name: choreName, description: description, multiplier: multiplier, userGroupId: auth.groupId},
            {withCredentials: false, headers:{'key': auth.apiKey}}
        );
        // @ts-ignore
        props.setNewChoreList(response.data);
        setShow(false);
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
                    <Modal.Title>Edit Chore</Modal.Title>
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
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Label>Times per Week</Form.Label>
                        <InputGroup size="lg" className="w-50 m-3">
                            <Button
                                onClick={() => multiplier > 1 ? setMultiplier(multiplier - 1) : setMultiplier(1)}
                            >
                                -
                            </Button>
                            <Form.Control
                                type="text"
                                value={multiplier}
                                readOnly={true}
                            />
                            <Button onClick={() => setMultiplier(multiplier + 1)}>+</Button>
                        </InputGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateChore}>Update Chore</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

