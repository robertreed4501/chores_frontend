import React, {useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row, Table} from "react-bootstrap";
import {AdminContext} from "../context/AdminProvider";


type dashCard = [{
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
    const [responseReceived, setResponseReceived] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    console.log(auth?.id + "from dashboard after loading useContext(AuthContext)");

    const navigate = useNavigate();

    useEffect(() => {
        /*if (auth !== undefined)*/
        getResponse().then(r => null)

    }, []);



    const key = Cookies.get('key');

    // @ts-ignore
    const getResponse = async () => {

            // @ts-ignore
            await axios.get('/api/dashboard', {withCredentials: false, headers:{'key': localStorage.getItem('authKey')}}).then(
                (response) => {
                    setData(response.data)
                    console.log("setting data - dashboard.tsx getResponse()")
                    setDashboard(response.data)
                    setResponseReceived(true);
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

    if (auth === undefined) {
        return(
            <>
                <h3>
                    Loading.....
                </h3>
            </>
        )
    }

    if (responseReceived && data?.at(0) === undefined) {
        return <div className="m-3 container-fluid col-6 justify-content-center"><h3>No Chores Assigned Yet</h3></div>
    }else
    // @ts-ignore
    return (<Container className="px-0 pt-4 text-center">


        <Container className="mb-5 p-3 rounded-4 shadow"><h3>Dashboard</h3></Container>

        <Container className=" p-3 rounded-4 shadow">
            <h3>Welcome, {auth.firstName}</h3>
            <h5>Here's how your group is doing this week</h5>
            <Row>
                {data?.map(user => (
                    <Col md={"auto"} key={user.userId}>
                        <div key={user.userId} className="Card">
                            <>
                                <h4 key={user.userId}>{user.name}'s chores</h4>

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
                                                <input key={chore.assignmentId} type="checkbox" defaultChecked={chore.done} onClick={() => handleCheck(chore.assignmentId)}/>

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
                ))}
            </Row>
        </Container>
</Container>
    )
}

