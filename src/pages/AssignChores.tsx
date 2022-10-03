import React, {useContext, useEffect, useState} from "react";
import {ChoreTable} from "../components/ChoreTable";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import Cookies from "js-cookie";
import Select from "react-select";
import {Button, Container, Table} from "react-bootstrap";
import {render} from "react-dom";
import {AdminContext} from "../context/AdminProvider";


export const AssignChores = () => {

    type UserListType = [{
        id: number
        firstName: string
    }]

    type selectedUserList = [{
        value: number
        label: string
    }]

    type UserType = {
        id: number
        firstName: string
    }

    type ChoreListType = [{
        id: number
        name: string
        choreLevel: "EASY" | "MEDIUM" | "HARD"
        frequency: "WEEKLY" | "MONTHLY" | "DAILY"
        scope: "PERSONAL" | "GROUP"
        selected: boolean
    }]

    type dashCard = [[{
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
    }]]

    const [userList, setUserList] = useState<UserListType>();
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const [choreList, setChoreList] = useState<ChoreListType>([{id: 0, name:"", choreLevel:"EASY", frequency:"WEEKLY", scope:"PERSONAL", selected: false}]);
    const [assignedChoresList, setAssignedChoresList] = useState<ChoreListType>();
    const [searchText, setSearchText] = useState<string>('');
    const [selectedChores, setSelectedChores] = useState<number[]>([]);
    const key = Cookies.get('key');

    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<dashCard>(AdminContext);



    console.log(auth.id + " - auth from assignChores.tsx");
    //get all users in group to list in dropdown
    const getUserList = async (userId: number | undefined) => {
        // @ts-ignore
        await axios.get('/api/user/mygroup?id=' + auth.id, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data);
                setUserList(response.data);
            }
        ).catch((error) => console.log(error));
    }

    const getChoreList = async (groupId: number | undefined) => {
        // @ts-ignore
        await axios.get('/api/chores/mygroup?id=' + auth.groupId, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data + " at getChoreList()");
                setChoreList(response.data);
            }
        ).catch((error) => console.log(error));
    }

    const getAssignmentsByUser = async (userId: number | undefined) => {
        // @ts-ignore
        await axios.get('/api/assignments?id=' + userId, {withCredentials: false, headers:{'key': key}}).then(
            (response) => {
                console.log(response.data);
                setAssignedChoresList(response.data);
            }
        ).catch((error) => console.log(error));
    }


    useEffect(() =>{
        getUserList(auth.id).then(() => null);
        getChoreList(auth.groupId).then(() => null);
    },[])

    useEffect(() => {

    }, [dashboard])
    //value=user.id ,



    let selectUserList: selectedUserList = [{value: 0, label: ""}];
    userList?.forEach(user => {
        selectUserList.push({value:user.id, label:user.firstName});
    })

    console.log(selectUserList?.at(0)?.label + " userList from AssignChores")
    console.log(userList?.at(0)?.id + " userList.at(0).id")


    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    // @ts-ignore
    const handleChange = (selectedOption) => {
        setSelectedUser({id: selectedOption.value, firstName: selectedOption.label});
        //
    }

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tempList: number[];
        tempList = selectedChores;
        if (event.target.checked) {
            tempList.push(parseInt(event.target.id));
            setSelectedChores(tempList);
        }
        else if (!event.target.checked){
            let currIndex = selectedChores.indexOf(parseInt(event.target.id));
            setSelectedChores((products) => products.filter((_, index) => index !== currIndex));
        }

    }

    const handleAssignChores = () => {
        !selectedUser ? alert("must select a user."):
        console.log("here's where we would axios.post to add assignments\n these assignments:" + selectedChores + " for " + selectedUser.firstName)
        selectedChores.map(chore => {

        });
    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.id);
        const response = await axios.post(
            'api/assignments/delete',
            JSON.stringify({assignmentId: parseInt(event.currentTarget.id), groupId: auth.groupId, userId:auth.id}),
            {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false,
        });
        //set response as users new dashcard in dashboard array.....and restart spring server before you try the above...
        // @ts-ignore
        setDashboard(response.data);

    }


    return (
        <>
            <Container>
            <Select
                options={selectUserList}
                onChange={handleChange}
            />
            <input type={"text"} onChange={handleSearch}/>
            <Table striped bordered hover responsive variant="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Chore Name</th>
                        <th>Level</th>
                        <th>Scope</th>
                    </tr>
                </thead>
                <tbody>

                {choreList?.map(chore =>{
                    if (searchText === ''){
                        return(
                            <tr key={chore.id}>
                                <td><input key={chore.id} id={chore.id.toString()} type={"checkbox"} onChange={handleCheck} /></td>
                                <td>{chore.name}</td>
                                <td>{chore.choreLevel.toLowerCase()}</td>
                                <td>{chore.scope.toLowerCase()}</td>
                            </tr>)
                    }
                    else{
                        if (chore.name.toLowerCase().includes(searchText.toLowerCase())){
                            return(
                                <tr key={chore.id}>
                                    <td>{chore.id}</td>
                                    <td>{chore.name}</td>
                                    <td>{chore.choreLevel.toLowerCase()}</td>
                                    <td>{chore.scope.toLowerCase()}</td>
                                </tr>)
                        }
                    }
                    ;}
                )}

                </tbody>
            </Table>

                <input type={"button"} key={"assignChoresButton"} name={"assignChoresButton"} onClick={handleAssignChores} value={"Add Chores"}/>
                <Table striped bordered hover responsive variant="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Chore Name</th>
                        <th>Level</th>
                        <th>Scope</th>
                    </tr>
                    </thead>
                    <tbody>

                    {dashboard?.map(user => {
                        console.log(selectedChores)
                        if (user.userId === selectedUser?.id) {
                            return (
                                user.chores.map(choreArray => {
                                    return (
                                        <tr key={choreArray.at(0)?.id}>
                                            <td>{choreArray.at(0)?.assignmentId}</td>
                                            <td>{choreArray.at(0)?.name}</td>
                                            <td>{choreArray.length}</td>
                                            <td><Button id={choreArray.at(0)?.assignmentId} value={"delete"} onClick={handleDelete} /></td>
                                        </tr>
                                    )

                                })
                            );
                        }

                    })}

                    </tbody>
                </Table>

            </Container>
        </>
    )
}