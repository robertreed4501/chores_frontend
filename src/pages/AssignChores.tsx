import React, {useContext, useEffect, useState} from "react";
import {ChoreTable} from "../components/ChoreTable";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import Cookies from "js-cookie";
import Select from "react-select";
import {Button, Container, Table} from "react-bootstrap";
import {render} from "react-dom";
import {AdminContext} from "../context/AdminProvider";
import {Link, useNavigate} from "react-router-dom";
import {AddChoreModal} from "../components/AddChoreModal";


export const AssignChores = () => {

    type UserListType = [{
        id: number
        firstName: string
        lastName: string
        email: string
        appUserRole: string
        apiKey: string
        groupId: number
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
        multiplier: Number
        scope: "PERSONAL" | "GROUP"
        selected: boolean
    }]

    type dashCard = [[{
        userId: any
        name: String
        chores: [[{
            done: String
            firstName: String
            multiplier: Number
            groupId: any
            assignmentId: any
            id: any
            name: String
            userId: any
        }]]
    }]]

    const [userList, setUserList] = useState<UserListType>();
    const [selectedUser, setSelectedUser] = useState<UserType>();
    const [choreList, setChoreList] = useState<ChoreListType>([{id: 0, name:"", choreLevel:"EASY", multiplier: 1, scope:"PERSONAL", selected: false}]);
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
        await axios.get('/api/user/mygroup?id=' + auth.groupId, {withCredentials: false, headers:{'key': key}}).then(
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
        getChoreList(auth.groupId).then(r => null);
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

    const handleAssignChores = async () => {

        if (!selectedUser) {
            alert("select a user")
            return null;
        }
        const response = await axios.post(
            'api/assignments/add',
            JSON.stringify({userId: selectedUser.id, groupId: auth.groupId, choreId: selectedChores}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
            });

        // @ts-ignore
        setDashboard(response.data);
        setSelectedChores([]);



    }

    const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {

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

    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/useradmin", {replace: false})
    }

    return (
        <>

            <Select
                options={selectUserList}
                onChange={handleChange}
            />
            <input type={"text"} onChange={handleSearch}/>
            <div className="tableContainer">
            <Table striped variant="sm">
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
                                <td><input
                                    key={chore.id}
                                    id={chore.id.toString()}
                                    type={"checkbox"}
                                    onChange={handleCheck}
                                    checked={selectedChores.includes(chore.id)}
                                /></td>
                                <td>{chore.name}</td>
                                <td>{chore.choreLevel.toLowerCase()}</td>
                                <td>{chore.scope.toLowerCase()}</td>
                            </tr>)
                    }
                    else{
                        if (chore.name.toLowerCase().includes(searchText.toLowerCase())){
                            return(
                                <tr key={chore.id}>
                                    <td><input
                                        key={chore.id}
                                        id={chore.id.toString()}
                                        type={"checkbox"}
                                        onChange={handleCheck}
                                        checked={selectedChores.includes(chore.id)}
                                    /></td>
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
            </div>
                <input type={"button"} key={"assignChoresButton"} name={"assignChoresButton"} onClick={handleAssignChores} value={"Add Chores"} className="m-2"/>
                <Button variant={"outline-primary"} onClick={handleAssignChores} className="m-2">Add Chores</Button>

                <AddChoreModal />
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
                                            <td><Button variant={"outline-primary"} id={choreArray.at(0)?.assignmentId} value={"delete"} onClick={handleDelete}>Delete</Button></td>
                                        </tr>
                                    )
                                })
                            );
                        }
                    })
                    }
                    </tbody>
                </Table>
                <Link to={"/useradmin"}>to user admin</Link>

        </>
    )
}