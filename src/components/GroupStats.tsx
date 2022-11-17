import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {Container, ProgressBar, Table} from "react-bootstrap";

export const GroupStats = () => {

    type GroupStats = [{
        name: string
        percentDoneThisWeek: number
        percentDoneAllTime: number
    }]

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const [groupStats, setGroupStats] = useState<GroupStats>();

    const getGroupStats = async () => {
        if (auth !== undefined){
            const response = await axios.get("api/stats/mygroup?groupId=" + auth.groupId,
                {withCredentials: false, headers:{'key': auth.key}});
            setGroupStats(response.data);
        }
    }

    useEffect(() => {if (auth !== undefined) getGroupStats()}, [auth])

    if (auth === undefined || groupStats === undefined) return(
        <Container className="rounded-4 shadow mb-3 p-3">
            <h3>Loading....</h3>
        </Container>
    )

    return (
        <Container className="rounded-4 shadow mb-3 p-3 mt-4">
            <h3>Group Stats</h3>
            <Table striped hover>
                <thead>
                    <td>Name</td>
                    <td>% Done This Week</td>
                    <td>% Done All Time</td>
                </thead>
                <tbody>
                {groupStats.map(entry => {
                    return(
                        <tr>
                            <td>{entry.name}</td>
                            <td><ProgressBar now={entry.percentDoneThisWeek} label={entry.percentDoneThisWeek + '%'} /></td>
                            <td><ProgressBar now={entry.percentDoneAllTime} label={entry.percentDoneAllTime + '%'} /></td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    )
}