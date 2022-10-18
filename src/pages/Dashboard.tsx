import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthProvider";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row, Table} from "react-bootstrap";
import {AdminContext} from "../context/AdminProvider";
import {log} from "util";

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
    const [data, setData] = useState<dashCard>(/*[{
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
    }]*/);




    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext(AdminContext);

    console.log(auth.id + "from dashboard after loading useContext(AuthContext)");

    const navigate = useNavigate();

    useEffect(() => {
        getResponse().then(r => null);
    }, []);



    const key = Cookies.get('key');

    // @ts-ignore
    const getResponse = async () => {
        // @ts-ignore
        await axios.get('http://10.0.0.18:8080/api/dashboard', {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                setData(response.data)
                console.log("setting data - dashboard.tsx getResponse()")
                setDashboard(response.data)
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
                console.log(response.data.message)
                response.data.message === 'receipt added.' ?
                    getResponse()


                : console.log ('receipt not added apparently...')

            }
        ).catch()
    }

    const handleClick = () => {
        navigate("/assignchores", {replace: false})
    }

    console.log(data);
    // @ts-ignore
    return (

        <Container><Row>{data?.map(user => (
            <Col md="auto" key={user.userId}>
                <div key={user.userId} className="Card">
                    <>
                        <h2 key={user.userId}>{user.name}'s chores</h2>

                        <Table className="table-sm">
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
                        </Table>
                    </>
                </div>
            </Col>
        ))}</Row>
            <input type={"button"} onClick={handleClick} value="click for assignchores"/>

        </Container>
    )
}

