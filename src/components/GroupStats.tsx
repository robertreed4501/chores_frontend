import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {Container, ProgressBar, Table} from "react-bootstrap";

export const GroupStats = () => {

    type GroupStats = [{
        userId: number
        name: string
        percentDoneThisWeek: number
        percentDoneLastWeek: number
        percentDoneAllTime: number
    }]

    type ModalProps = {
        userId: number
        when: "thisWeek" | "lastWeek"
        showModal: boolean
        setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    }

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
                <tr>
                    <td>Name</td>
                    <td>% Done This Week</td>
                    <td>% Done Last Week</td>
                    <td>% Done All Time</td>
                </tr>
                </thead>
                <tbody>
                {groupStats.map(entry => {
                    return(
                        <tr key={entry.userId}>
                            <td>{entry.name}</td>
                            <td>
                                <ProgressBar
                                    key={entry.userId + "-pdtw"}
                                now={entry.percentDoneThisWeek}
                                label={entry.percentDoneThisWeek + '%'}
                                className="progress-bar-striped"
                                />
                            </td>
                            <td>
                                <ProgressBar
                                    key={entry.userId + "-pdlw"}
                                    now={entry.percentDoneLastWeek}
                                    label={entry.percentDoneLastWeek + '%'}
                                    className="progress-bar-striped"/>
                            </td>
                            <td>
                                <ProgressBar
                                    key={entry.userId + "-pdat"}
                                    now={entry.percentDoneAllTime}
                                    label={entry.percentDoneAllTime + '%'}
                                    className="progress-bar-striped"/>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </Container>
    )
}