import React from 'react'
import {Button, Container} from "react-bootstrap";
import kidsCleaning from "../images/kidscleaning.jpg"
import {LoginModal} from "./LoginModal";
import {useNavigate} from "react-router-dom";

function TestElement() {

    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('register');
    }

    const collapseNavbar = (): void => {};

    return (
        <Container fluid className="mt-4 shadow rounded-4 p-3 overflow-hidden text-center">
            <h1>Messy kids? .... We can help!</h1>
            <p><h3>Don't just give them chores, give them ChoresGalore!</h3></p>
            <img src={kidsCleaning} className="align-self-center my-auto mx-auto"/>
            <br /><br /><br />
            <p>Our New Digital version of our classic chore chart will make organizing your family's chores easy as pie!</p>
            <Container className="p-3 mb-3 rounded-4 shadow flex-lg-wrap bg-light" hidden={!!localStorage.getItem('loggedIn')}>
                <h5>New To ChoresGalore?</h5>
                <Button className="btn btn-primary m-2" onClick={handleRegister}>Register</Button>
                <h5>Returning user?  Login here</h5>
                <LoginModal collapseNavbar={collapseNavbar}/>
            </Container>
        </Container>
)
}

export default TestElement