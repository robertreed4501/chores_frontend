import React, {useContext} from "react";
import {useRef, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
const LOGIN_URL = '/login';

export const Login = () => {
    // @ts-ignore
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const errRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);

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
                {
                    headers: { 'Content_Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response))
            setUser('');
            setPassword('');
            setSuccess(true);
        }catch (err){

        }


    }

    return(
    <section>

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
            Need an Account?<br />

        </p>
    </section>
);
}