import React, {useContext} from "react";
import {useRef, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Cookies from "js-cookie"

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

    useEffect(() => {
        // @ts-ignore
        userRef.current.focus();
    }, []);

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
                console.log(auth.id + " auth after setAuth")
                console.log(response.data.userResponse.groupId + " response.data.userResponse")
                setUser('');
                setPassword('');
                setSuccess(true);
                Cookies.set('key', response.data.userResponse.key, { expires: 7});
                console.log(Cookies.get('key') + "  - from login.tsx")
                response.data.userResponse.role === "USER" ?
                navigate("/user", {replace: false}) : navigate("/dashboard")
            }

        }catch (err){

        }
         //success ? navigate("/user", {replace: true}) : navigate("/user", {replace: true});

    }

    return(
    <section>
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
    </section>
);
}