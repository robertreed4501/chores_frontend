import React, {useContext, useEffect, useState} from "react";
import {ChoreTable} from "../components/ChoreTable";
import {AuthContext} from "../context/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

export const AssignChores = () => {

    const [userList, setUserList] = useState();

    const key = Cookies.get('key');

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    //get all users in group to list in dropdown
    const getUserList = async (userId: number | undefined) => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/mygroup?id=' + auth.id, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data);
                setUserList(response.data);
            }
        ).catch((error) => console.log(error));
    }

    useEffect(() =>{
        getUserList(auth.id);
    },[])
    //value=user.id ,

    return (
        <>
            <select name="User">
                <option value={5}>Iam</option>
                <option value={4}>Aiden </option>
                <option value={3}>Jayne </option>
            </select>
            <ChoreTable />
            <ChoreTable />
        </>
    )
}