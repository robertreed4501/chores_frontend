import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import Cookies, {get} from "js-cookie";
import axios from "../api/axios";

type AuthType = {
    id: number | null
    firstName: string | null
    lastName: string | null
    email: string | null
    role: string | null
    key: string | null
    groupId: number | null
}

export const AuthContext = createContext({});

// @ts-ignore
export const AuthProvider = ({ children }) => {
    // @ts-ignore
    const [auth, setAuth] = useState<AuthType>({
        /*id: null,
        firstName: null,
        lastName: null,
        email: null,
        role: null,
        key: null,
        groupId: null*/
    });



    /*const getResponse = async (key: string | undefined) => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/user', {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                setAuth(response.data.UserResponse)
                console.log(response.data.UserResponse + " - user response from authProvider")
            }
        ).catch((error) => console.log(error));
    }

    if (auth === undefined) {
        if (Cookies.get('key')) {
            let key: string | undefined = Cookies.get('key');
            getResponse(key).then(r => null);

        }
    }*/
/*
    const checkAuth = async () => {
        if (localStorage.getItem('authKey')) {
            // @ts-ignore
            const response = await axios.get('/api/user', {withCredentials: false, headers:{'key': localStorage.getItem('authKey').toString()}})
            setAuth(await response.data.userResponse);
            console.log(JSON.stringify(auth) + " - checkAuth json(auth)");
            // @ts-ignore
            console.log(JSON.stringify(localStorage.getItem('authKey')) + " - checkAuth json(localStorage.getItem)")
        }
    }



    useEffect(() => {checkAuth()}, []);*/

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}