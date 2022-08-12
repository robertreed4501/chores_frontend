import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";

type dashCard = [{
    userId: Number
    name: String
    chores: [{
        done: String
        firstName: String
        frequency: String
        groupId: Number
        id: Number
        name: String
        userId: Number
    }]
}]


export const Dashboard = () => {
    const [data, setData] = useState([{
        userId: null,
        name: "",
        chores: [[{
            done: "",
            firstName: "",
            frequency: "",
            groupId: null,
            id: null,
            name: "",
            userId: null
        }]]
    }]);

    const [view, setView] = useState([{
        userId: null,
        name: "",
        chores:[{

        }]
    }])


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
                <h2 key={user.userId}>{user.name}'s chores</h2>
                {user.chores.map(choreList => (// @ts-ignore
                    choreList.at(0) ? <li key={choreList.at(0).id}>{choreList.at(0).name} <input type="checkbox"/></li> : <li>error</li>

                    /*<li key={chore.id}>{chore.name}  -  {chore.done}</li>*/
                ))}
            </div>
        ))}
        </>
    )
}