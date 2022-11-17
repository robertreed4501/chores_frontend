import React, {useContext, useEffect, useState} from "react";
import {Container, ProgressBar, Table} from "react-bootstrap";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {AdminContext} from "../context/AdminProvider";



export const UserStats =  () => {
     type Stats = [{
         userId: number;
         firstName: string;
         lastName: string;
         percentDone: number;
         start: string;
         end: string;
     }]

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext(AdminContext);

    const [stats, setStats] = useState<Stats>();


    const getStats = async () => {
        const response = await axios.get("api/stats?userId=" + auth.id + "&numWeeks=4", {withCredentials: false, headers:{'key': auth.key}});

        setStats(response.data)
    }

    useEffect(() => {getStats()}, [dashboard]);

    if (auth === undefined || stats === undefined) return(
        <Container className="rounded-4 shadow mb-3 p-3">
            <h3>Loading....</h3>

        </Container>
    )

    return(
        <Container className="rounded-4 shadow mb-3 p-3 text-center">
            <h1>Stats</h1>

            <Table striped hover>
                <thead>
                    <tr>
                        <td>Week of</td>
                        <td>% Done</td>
                    </tr>
                </thead>
                <tbody>
                {
                    stats.map(stat => {
                        return(
                            <tr>
                                <td>{stat.start}</td>
                                <td><ProgressBar now={stat.percentDone} label={Math.round(stat.percentDone) + '%'} /> </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        </Container>
    )
}