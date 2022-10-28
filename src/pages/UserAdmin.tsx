import React, {MouseEventHandler, ReactEventHandler, useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";

import Cookies from "js-cookie";
import Select from "react-select";
import {AddUserModal} from "../components/AddUserModal";
import {Button, Container, Table} from "react-bootstrap";
import {EditUserModal} from "../components/EditUserModal";

export const UserAdmin = () => {

    type UserInfo = [{
        id: number
        firstName: string
        lastName: string
        email: string
        role: string
        key: string
        groupId: number
    }]

    type UserList = [{
        value: number
        label: string
    }]

    type SelectedUser = {
        id: number
        firstName: string
    }


    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [selectedUser, setSelectedUser] = useState<SelectedUser>();
    // @ts-ignore
    const [userList, setUserList] = useState<UserList>();
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const key = Cookies.get('key');

    const getUserInfo = async () => {
        // @ts-ignore
        const response = await axios.get('/api/user/mygroup?id=' + auth.groupId, {withCredentials: false, headers:{'key': key}});
        // @ts-ignore
        setUserInfo(response.data);
        console.log(JSON.stringify(userInfo))
    }

    const populateUserList = () => {
        //take userInfo and map to return
        let selectUserList= [{value: 0, label: ""}];
        // @ts-ignore
        userInfo?.forEach(user => {
            selectUserList.push({value:user.id, label:user.firstName + ' ' + user.lastName});
        })
        // @ts-ignore
        setUserList(selectUserList);
    }

    useEffect(() => {
        getUserInfo();
    }, [])

    useEffect(() => {
        populateUserList();
    }, [userInfo])

    // @ts-ignore
    const handleChange = (selectedOption) => {
        // @ts-ignore
        setSelectedUser({id: selectedOption.value, firstName: selectedOption.label});

    }

    // @ts-ignore
    const handleDelete = async (e) => {
        const id = e.target.id;
        const response = await axios.delete("/api/user/delete/" + id);
        response.data === "user deactivated" ? await getUserInfo() : alert(response.data)
    }

    // @ts-ignore
    return(
        <Container className="m-3 p-3 w-50">
            <Select
                options={userList}
                onChange={handleChange}
            />
            <Table key="userTable" striped >
                <thead>
                <tr>
                    <td>Name</td>
                    <td> </td>
                    <td> </td>
                </tr>
                </thead>
                <tbody>
                {userInfo?.map( user => {
                    return(
                        <tr>
                            <td>{user.firstName + ' ' + user.lastName}</td>
                            <td><EditUserModal
                                id={user.id}
                                firstName={user.firstName}
                                lastName={user.lastName}
                                email={user.email}
                                role={user.role}
                                getUserInfo={getUserInfo}
                            /> </td>
                            <td><Button id={user.id.toString()} onClick={handleDelete}>Delete</Button> </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
            {userInfo && selectedUser ?
                userInfo.map(user =>
                    user.id === selectedUser.id ?
                        <div>
                            <h3>{user.firstName + ' ' + user.lastName}</h3>
                            <h4>{"Email: " + user.email}</h4>
                            <h4>{"API Key: " + user.key}</h4>
                        </div>:
                         null) : <h3>Select a user</h3>}
            <AddUserModal getUserInfo={getUserInfo}/>
        </Container>
    );
}