import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useContext, useEffect} from "react";
import {AuthContext} from "./context/AuthProvider";
import axios from "./api/axios";



export const PrivateRoutes = () => {
    const key = localStorage.getItem('authKey');

    const getResponse = async (key: string | undefined) => {
        // @ts-ignore
        await axios.get('/api/user', {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                setAuth(response.data.UserResponse)
                console.log(response.data.UserResponse + " - user response from authProvider")
            }
        ).catch((error) => console.log(error));
    }
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext)
    /*const checkAuth = () => !auth.id ? getResponse(key) : console.log(auth.id + " auth.id from conditional in privateRoutes")

    useEffect(() => {checkAuth()},[])*/
    console.log(key + " - from PrivateRoutes.tsx")
    console.log(auth)

    return (
        localStorage.getItem('authKey') ? <Outlet/> : <Navigate to="/" />
    )
}