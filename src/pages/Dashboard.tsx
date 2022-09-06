import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";
import Cookies from "js-cookie";

type dashCard = [{
    userId: any
    name: String
    chores: [[{
        done: String
        firstName: String
        frequency: String
        groupId: any
        assignmentId: any
        id: any
        name: String
        userId: any
    }]]
}]


export const Dashboard = () => {
    const [data, setData] = useState<dashCard>([{
        userId: 0,
        name: "",
        chores: [[{
            done: "",
            firstName: "",
            frequency: "",
            groupId: 0,
            assignmentId: 0,
            id: 0,
            name: "",
            userId: 0
        }]]
    }]);




    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    console.log(auth);

    useEffect(() => {
        getResponse();
    }, []);



    const key = Cookies.get('key');

    // @ts-ignore
    const getResponse = async () => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/dashboard', {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                setData(response.data)
            }
        ).catch((error) => console.log(error));
    }

    // @ts-ignore
    const handleCheck = async (id: Number | null) => {
        // @ts-ignore
        //const id = e.target.id
        console.log(id + " - from handleCheck Dashboard.tsx")

        // @ts-ignore
        await axios.post('http://10.0.0.18:8080/api/receipts', {"assignmentId": id, "arb": 1}, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                response.data.message === 'receipt added.' ? getResponse() : console.log('receipt not added apparently...')
            }
        ).catch()
    }

    console.log(data);
    // @ts-ignore
    return (

        <>{data.map(user => (
            <div key={user.userId} className="Card"><>
                <h2 key={user.userId}>{user.name}'s chores</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Chore</th>
                        <th>Done</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user.chores.map(choreList => (
                        <tr key={choreList.at(0)?.id}>
                            <td><li key={choreList.at(0)?.id}>{choreList.at(0)?.name} </li></td>
                            <td key={choreList.at(0)?.id} align="right">
                            {choreList.map(chore =>(
                                <input key={chore.assignmentId} type="checkbox" defaultChecked={chore.done === 'true'} onClick={() => handleCheck(chore.assignmentId)}/>

                            ))}
                            </td>
                        </tr>
                        /*<li key={chore.id}>{chore.name}  -  {chore.done}</li>*/
                    ))}
                    </tbody>
                </table>
                </>
            </div>
        ))}
        </>
    )
}

