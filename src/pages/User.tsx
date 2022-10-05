import React, {useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";
import axios from "axios";
import Cookies from "js-cookie";



export const User = () => {
    type singleDashCard = {
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
    }

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const [data, setData] = useState<singleDashCard>();

    const key = Cookies.get('key');

    const getResponse = async () => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/dashboard/user?userId=' + auth.id, {withCredentials: false, headers:{'key': key, 'content-type':'application/json'}}).then(
            (response) => {
                setData(response.data)
                console.log("setting data - dashboard.tsx getResponse()")
            }
        ).catch((error) => console.log(error));
    }

    useEffect(() => {
        getResponse().then(r => null)
    }, [])

    // @ts-ignore
    const handleCheck = async (id: Number | null) => {
        // @ts-ignore
        //const id = e.target.id
        console.log(id + " - from handleCheck Dashboard.tsx")

        // @ts-ignore
        await axios.post('http://10.0.0.18:8080/api/receipts', {"assignmentId": id, "arb": 1}, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data.message)
                response.data.message === 'receipt added.' ?
                    getResponse()


                    : console.log ('receipt not added apparently...')

            }
        ).catch()
    }

    return(
        <div key={data?.userId} className="Card"><>
            <h2 key={data?.userId}>{data?.name}'s chores</h2>
            <table>
                <thead>
                <tr>
                    <th>Chore</th>
                    <th>Done</th>
                </tr>
                </thead>
                <tbody>
                {data?.chores.map(choreList => (
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
    )
}