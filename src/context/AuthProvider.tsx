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
    const [auth, setAuth] = useState<AuthType>({});

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}