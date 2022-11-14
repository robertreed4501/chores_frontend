import React, {useContext, useRef, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import {FloatingLabel, FormLabel} from "react-bootstrap";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import {AdminContext} from "../context/AdminProvider";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import bcrypt from "bcryptjs";

const LOGIN_URL = '/login';

export const LoginModal = () => {



    const [show, setShow] = useState(false);
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();


        try{
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({username: user, password}),
                //{"username":{user}, "password":{password}},
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false,
                }
            );
            console.log(JSON.stringify(response));
            if (response.data.error){
                alert(response.data.error)
            }//else{
                console.log("logged in with token:" + response.data.userResponse.key);
                setAuth(response.data.userResponse);
                localStorage.setItem('authKey', response.data.userResponse.key);
                localStorage.setItem('loggedIn', String(true));
                console.log(localStorage.getItem('auth') + " - auth from local storage in login modal");
                /*setTimeout(() => 500);
                console.log(auth.id + " auth after setAuth")*/
                console.log(response.data.userResponse.groupId + " response.data.userResponse")
                setUser('');
                setPassword('');
                setSuccess(true);
                Cookies.set('key', response.data.userResponse.key, { expires: 7, sameSite: "none"});
                console.log(Cookies.get('key') + "  - from login.tsx")
                response.data.userResponse.role === "USER" ?
                    navigate("/user", {replace: false}) :
                    navigate("/dashboard")
            //}

        }catch (err){
            console.log(err)
        }
        //success ? navigate("/user", {replace: true}) : navigate("/user", {replace: true});

    }

    return (
        <>
            <Button className="btn btn-primary m-2" onClick={handleShow}>
                Login
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={event => setUser(event.target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>Login</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

