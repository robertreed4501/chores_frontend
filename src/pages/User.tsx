import React, {useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import {Messages} from "../components/Messages";
import {Col, Container, Row} from "react-bootstrap";
import {UserStats} from "../components/UserStats";



export const User = () => {
    type singleDashCard = {
        userId: any
        name: String
        chores: [[{
            done: boolean
            firstName: String
            frequency: String
            groupId: any
            assignmentId: any
            id: any
            name: String
            description: string
            userId: any
        }]]
    }

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const [data, setData] = useState<singleDashCard>();

    const key = Cookies.get('key');

    const getResponse = async () => {
        // @ts-ignore
        await axios.get('/api/dashboard/user?userId=' + auth.id, {withCredentials: false, headers:{'key': key, 'content-type':'application/json'}}).then(
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
        await axios.post('/api/receipts', {"assignmentId": id, "arb": 1}, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data.message)
                response.data.message === 'receipt added.' ?
                    getResponse()


                    : console.log ('receipt not added apparently...')

            }
        ).catch()
    }

    return(
        <Container>
            <Row>
                <Col>
                    <div key={data?.userId} className="col-12 card-body border-dark border-4 rounded-4 shadow p-3 bg-white">
                        <>
                        <h2 key={data?.userId}>{data?.name}'s chores</h2>

                            {data?.chores.map(choreList => (
                                <div className="rounded-4 shadow p-3 mb-3 bg-light">
                                    <div key={choreList.at(0)?.id}>
                                        <div><li key={choreList.at(0)?.id}>{choreList.at(0)?.name} </li>{choreList.at(0)?.description}</div>
                                        <div key={choreList.at(0)?.id} >
                                            {choreList.map(chore =>(
                                                <input key={chore.assignmentId} type="checkbox" defaultChecked={chore.done} onClick={() => handleCheck(chore.assignmentId)}/>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                                /*<li key={chore.id}>{chore.name}  -  {chore.done}</li>*/
                            ))}

                        </>
                    </div>
                </Col>
                <Col>
                    <UserStats />
                </Col>
            </Row>
        </Container>
    )
}