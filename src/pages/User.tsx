import React from "react";
import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";



export  const User = () => {
    const user = useContext(AuthContext);
    return(
        <h3>{JSON.stringify({ user })}</h3>
    )
}