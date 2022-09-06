import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = () => {
    let key = Cookies.get('key');

    console.log(key + " - from PrivateRoutes.tsx")

    return (
        key ? <Outlet/> : <Navigate to="login" />
    )
}