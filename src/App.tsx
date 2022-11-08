import React, {useContext, useEffect, useState} from 'react';
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
import PanelFooter from "react-bootstrap/lib/PanelFooter";
import axios from "axios";




function App() {
// @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();



    const handleLogout = () => {
        Cookies.remove('key');
        setExpanded(false);
        setAuth({});
        navigate("/");
    }

    const handleRegister = () => {
        setExpanded(false);
        navigate("/register");
    }

    const collapseNavbar = () => {
        setExpanded(false);
    }

    const toggleNavbar = () => {
        setExpanded(!expanded);
    }

    const createNavbar = () => {
        if (auth === undefined || !auth.id){
            return(
            <><Nav className="me-auto">
                <Nav.Link as={Link} to="/about" onClick={collapseNavbar}>About</Nav.Link>
            </Nav>
                <Nav>
                <Button className="btn btn-primary m-2" onClick={handleRegister}>Register</Button>

                <LoginModal />
            </Nav></>)
        }else if (auth.role === 'USER'){
            return(
            <><Nav className="me-auto">
                <Nav.Link as={Link} to="/user" onClick={collapseNavbar}>My Chores</Nav.Link>
                <Nav.Link as={Link} to="/messages" onClick={collapseNavbar}>Messages</Nav.Link>
                <Nav.Link as={Link} to="/help" onClick={collapseNavbar}>Help</Nav.Link>

            </Nav>
                <Nav>
                <Button className="btn btn-primary" onClick={handleLogout}>Logout</Button>
            </Nav></>)
        }else if (auth.role === 'ADMIN' || auth.role === 'OWNER'){
            return(
            <><Nav className="me-auto">


                <Nav.Link as={Link} to="/dashboard" onClick={collapseNavbar}>Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/useradmin" onClick={collapseNavbar}>Users</Nav.Link>
                <Nav.Link as={Link} to="/assignchores" onClick={collapseNavbar}>Assign Chores</Nav.Link>

            </Nav><Nav>
                <Button className="btn btn-primary" onClick={handleLogout}>Logout</Button>
            </Nav></>)
        }
    }



  // @ts-ignore
    return (
        <div style={{backgroundColor: "#54bdea",
            width: "100vw",
            height: "100vh",
            paddingTop: "2em",
            marginBottom: "2em"
            }}>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
                integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
                crossOrigin="anonymous"
            />

            <Navbar bg="dark" expand="lg" className="bg-dark navbar-dark fixed-top" expanded={expanded}>
                <Container className="rounded shadow-lg">
                    <Navbar.Brand as={Link} to="/" onClick={collapseNavbar}>ChoresGalore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {createNavbar()}


                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="align-items-center align-self-center w-75 h-100" style={{backgroundColor: "#f2f2f5"}}>
                <Routes>
                    <Route element={<PrivateRoutes/>} >

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
            </Container>
        <footer className="bg-dark text-light align-items-center fixed-bottom"><h3 className="mx-auto">footer</h3></footer>
        </div>
    );
}

export default App;
