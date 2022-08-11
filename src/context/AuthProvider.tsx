import { createContext, useState} from "react";

export const AuthContext = createContext({});

// @ts-ignore
export const AuthProvider = ({ children }) => {
    // @ts-ignore
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}