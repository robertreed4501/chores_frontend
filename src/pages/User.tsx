import React, {useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import {useContext} from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";
import {Col, Container, Row} from "react-bootstrap";
import green_check from "../images/green_check.png"
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

        await axios.get('/api/dashboard/user?userId=' + auth.id,
            // @ts-ignore
            {withCredentials: false, headers:{'key': key, 'content-type':'application/json'}})
            .then(
            (response) => {
                setData(response.data)
                console.log("setting data - dashboard.tsx getResponse()")
            }
        ).catch((error) => console.log(error));
    }

    useEffect(() => {
        if (auth.id !== undefined)
        getResponse().then(r => null)
    }, [auth])

    // @ts-ignore
    const handleCheck = async (id: Number | null) => {
        // @ts-ignore
        //const id = e.target.id
        console.log(id + " - from handleCheck Dashboard.tsx")


        await axios.post('/api/receipts',
            {"assignmentId": id, "arb": 1},
            // @ts-ignore
            {withCredentials: false, headers:{'key': key}})
            .then(
            (response) => {
                console.log(response.data.message)
                response.data.message === 'receipt added.' ?
                    getResponse()


                    : console.log ('receipt not added apparently...')

            }
        ).catch(err => console.log(err))
    }

    if (data === undefined) return (
        <Container>
            <h3>Loading</h3>
        </Container>
    )
    if (data.chores === undefined) return (
        <Container>
            <h3>No Chores Assigned Yet</h3>
        </Container>
    )

    return(
        <Container className="rounded-4 shadow p-3 mt-4 text-center">
            <Row>
                <Col md={6}>
                    <div key={data?.userId} className="col-12 card-body border-dark border-4 rounded-4 shadow p-3 bg-white">
                        <>
                        <h2 key={data?.userId}>{data?.name}'s chores</h2>

                            {data?.chores.map(choreList => (
                                <div className="rounded-4 shadow p-3 mb-3 bg-light text-start">
                                    <div key={choreList.at(0)?.id}>
                                        <div>
                                            <li key={choreList.at(0)?.id}>
                                                {choreList.at(0)?.name}
                                            </li>{choreList.at(0)?.description}
                                        </div>
                                        <div key={choreList.at(0)?.id} className="text-end">
                                            {choreList.map(chore =>(<>
                                                <input key={chore.assignmentId}
                                                       className="form-control-color active"
                                                       type="checkbox"
                                                       defaultChecked={chore.done}
                                                       hidden={chore.done}
                                                       onClick={() => handleCheck(chore.assignmentId)}/>
                                                <img src={green_check} width={25} height={25} hidden={!chore.done}/>
                                            </>

                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    </div>
                </Col>
                <Col md={6}>
                    <UserStats />
                </Col>
            </Row>
        </Container>
    )
}