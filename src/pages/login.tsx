import React, {useContext} from "react";
import {useRef, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"
import {Button, Container, Form} from "react-bootstrap";

const LOGIN_URL = '/login';

export const Login = () => {

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

/*    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, []);*/

    useEffect(() => {
        setErr('');
    }, [user, password]);



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
                console.log(response.data.error)
            }else{
                console.log("logged in with token:" + response.data.userResponse.key);
                setAuth(response.data.userResponse);
                /*setTimeout(() => 500);
                console.log(auth.id + " auth after setAuth")*/
                console.log(response.data.userResponse.groupId + " response.data.userResponse")
                setUser('');
                setPassword('');
                setSuccess(true);
                Cookies.set('key', response.data.userResponse.key, { expires: 7, sameSite:"none"});
                console.log(Cookies.get('key') + "  - from login.tsx")
                response.data.userResponse.role === "USER" ?
                    navigate("/user", {replace: false}) :
                    navigate("/dashboard")
            }

        }catch (err){
            alert(err)
        }
         //success ? navigate("/user", {replace: true}) : navigate("/user", {replace: true});

    }

    return(
        <Container className="col-6">
            <Form style={{marginTop:"69px"}}>
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
                <Button variant="primary" type="button" onClick={handleSubmit}>
                    Login
                </Button>
            </Form>
        </Container>
    /*<section>
        {success ? <Navigate to="user" /> : null}

        <p ref={errRef} className={err ? "errorMsg" : "offscreen"} aria-live="assertive">{err}</p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
            />
            <button>Sign In</button>
        </form>
        <p>
            <Link to="/register">Need an Account?</Link><br />

        </p>
    </section>*/
);
}