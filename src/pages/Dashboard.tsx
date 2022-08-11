import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";


export const Dashboard = () => {
    const [data, setData] = useState([{
        userId: null,
        name: "",
        chores: [{
        done: "",
        firstName: "",
        frequency: "",
        groupId: null,
        id: null,
        name: "",
        userId: null}]
            }]);


    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    console.log(auth);

    useEffect(() => {
        getResponse();
    }, []);

    // @ts-ignore
    const getResponse = async () => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/dashboard', {withCredentials: false, headers:{'key': auth.key}}).then(
            (response) => {
                setData(response.data)
            }
        ).catch((error) => console.log(error));
    }

    console.log(data);






    return (

        <>{data.map(user => (
            <div key={user.userId} className="Card">
                <h2>{user.name}'s chores</h2>
                {user.chores.map(chore => (
                    <li>{chore.name}  -  {chore.done}</li>
                ))}
            </div>
        ))}
        </>
    )
}