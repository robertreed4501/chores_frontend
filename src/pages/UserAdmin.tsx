import React, {useContext, useEffect, useState} from "react";
import axios from "../api/axios";
import {AuthContext} from "../context/AuthProvider";
import Cookies from "js-cookie";
import Select from "react-select";

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
    const [userList, setUserList] = useState<UserList>();
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    const key = Cookies.get('key');

    const getUserInfo = async () => {
        // @ts-ignore
        const response = await axios.get('/api/user/mygroup?id=' + auth.id, {withCredentials: false, headers:{'key': key}});
        // @ts-ignore
        setUserInfo(response.data);
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


    return(
        <div>
            <Select
                options={userList}
                onChange={handleChange}
            />
            {userInfo && selectedUser ?
                userInfo.map(user =>
                    user.id === selectedUser.id ?
                        <div>
                            <h3>{user.firstName + ' ' + user.lastName}</h3>
                            <h4>{"Email: " + user.email}</h4>
                            <h4>{"API Key: " + user.key}</h4>
                        </div>:
                         null) : <h3>Select a user</h3>}
        </div>
    );
}