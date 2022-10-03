import { createContext, useState} from "react";
import Cookies, {get} from "js-cookie";
import axios from "axios";


export const AuthContext = createContext({});

// @ts-ignore
export const AuthProvider = ({ children }) => {
    // @ts-ignore
    const [auth, setAuth] = useState({});

    const getResponse = async (key: string | undefined) => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/user', {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                setAuth(response.data.UserResponse)
                console.log(response.data.UserResponse)
            }
        ).catch((error) => console.log(error));
    }

    if (!auth) {
        if (Cookies.get('key')) {
            let key: string | undefined = Cookies.get('key');
            getResponse(key).then(r => null);

        }
    }



    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}