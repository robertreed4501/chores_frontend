import React, {useContext, useEffect} from 'react';
import './App.css';
import './index.css';
import {Link, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import TestElement from "./components/TestElement";
import OtherTest from "./components/OtherTest";
import {Login} from "./pages/login";
import {User as UserPage} from "./pages/User";
import {Register} from "./pages/Register";
import {Dashboard} from "./pages/Dashboard";
import {PrivateRoutes} from "./PrivateRoutes";
import {AssignChores} from "./pages/AssignChores";
// @ts-ignore
import Sidebar from "react-bootstrap-sidebar";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {UserAdmin} from "./pages/UserAdmin";
import Cookies from "js-cookie";
import {AuthContext} from "./context/AuthProvider";
import {LoginModal} from "./components/LoginModal";




function App() {
// @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('key');
        setAuth({});
        navigate("/");
    }

    const handleRegister = () => {
        navigate("/register");
    }

    const createNavbar = () => {
        if (!auth.id){
            return(
            <><Nav className="me-auto">
                <Nav.Link as={Link} to="/about">About</Nav.Link>
            </Nav>
                <Nav>
                <Button className="btn btn-primary m-2" onClick={handleRegister}>Register</Button>

                <LoginModal />
            </Nav></>)
        }else if (auth.role === 'USER'){
            return(
            <><Nav className="me-auto">
                <Nav.Link as={Link} to="/user">My Chores</Nav.Link>
                <Nav.Link as={Link} to="/messages">Messages</Nav.Link>
                <Nav.Link as={Link} to="/help">Help</Nav.Link>

            </Nav>
                <Nav>
                <Button className="btn btn-primary" onClick={handleLogout}>Logout</Button>
            </Nav></>)
        }else if (auth.role === 'ADMIN' || auth.role === 'OWNER'){
            return(
            <><Nav className="me-auto">


                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/useradmin">Users</Nav.Link>
                <Nav.Link as={Link} to="/assignchores">Assign Chores</Nav.Link>

            </Nav><Nav>
                <Button className="btn btn-primary" onClick={handleLogout}>Logout</Button>
            </Nav></>)
        }
    }

  // @ts-ignore
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />

            <Navbar bg="dark" expand="lg" className="bg-dark navbar-dark ">
                <Container className="rounded shadow-lg">
                    <Navbar.Brand as={Link} to="/">ChoresGalore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {createNavbar()}


                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="align-items-center align-self-center mx-auto">
                <Routes>
                    <Route element={<PrivateRoutes/>}>

                        <Route path="/test" element={<OtherTest />} />

                        <Route path="/user" element={<UserPage />} />


                        <Route path="/useradmin" element={<UserAdmin />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/assignchores" element={<AssignChores />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<TestElement/>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <p>Hello?</p>
            </Container>
        </>
    );
}

export default App;
