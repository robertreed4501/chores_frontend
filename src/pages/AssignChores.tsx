import React, {useContext, useEffect, useState} from "react";
import {ChoreTable} from "../components/ChoreTable";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import Cookies from "js-cookie";
import Select from "react-select";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
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
        name: string
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
        selectUserList.push({value:user.id, label:user.firstName + " " + user.lastName});
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
        console.log(selectedChores)

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

    const handleDeleteChore = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.delete("/api/chores/delete/" + event.currentTarget.id);
        alert(response.data)
        await getChoreList(auth.groupId);
    }

    const handleUnassignChores = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.delete("/api/assignments/delete/" + selectedUser?.id);
        alert(response.data)
        await getResponse();
    }


    const getResponse = async () => {
        const response = await axios.get('/api/dashboard', {withCredentials: false, headers:{'key': auth.key}});


                console.log("setting data - dashboard.tsx getResponse()");
                // @ts-ignore
        setDashboard(response.data);



    }

    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/useradmin", {replace: false})
    }

    return (
        <>
            <Container className="m-3 p-3 border-light border-2 rounded-4 shadow">
                <Row className="my-auto">
                    <h1>Assign Chores</h1>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <Container className="m-3 p-3 border-2 rounded-4 shadow">
                            <Row className="mb-2">
                                <Col md={"auto"}>
                                    <h4>Search Chores:</h4>
                                </Col>
                                <Col md={"auto"}>
                                    <input type={"text"} onChange={handleSearch}/>
                                </Col>


                            </Row>

                            <div className="tableContainer">

                                <Table striped variant="sm" className="table-bordered table-light">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Chore Name</th>
                                        <th>Times per Week</th>
                                        <th> </th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {choreList?.map((chore, index) =>{
                                        if (searchText === ''){
                                            return(
                                                <tr key={chore.id}>
                                                    <td>
                                                        <Form>
                                                            <Form.Check
                                                                key={index}
                                                                id={index.toString()}
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheck(e)}
                                                                checked={chore.selected}
                                                            />
                                                        </Form></td>
                                                    <td>{chore.name}</td>
                                                    <td>{chore.multiplier.toString()}</td>
                                                    <td><Button variant={"outline-primary"} id={chore.id.toString()} value={"delete"} onClick={handleDeleteChore}>Delete</Button></td>
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
                                                        <td>{chore.multiplier.toString()}</td>
                                                        <td><Button variant={"outline-primary"} id={chore.id.toString()} value={"delete"} onClick={handleDeleteChore}>Delete</Button></td>
                                                    </tr>)
                                            }
                                        }
                                        ;}
                                    )}

                                    </tbody>
                                </Table>

                            </div>
                            <AddChoreModal />
                            <Button variant={"outline-primary"} onClick={handleAssignChores} className="m-2">
                                Assign Chores to {selectedUser?.name}</Button>


                        </Container>
                    </Col>
                    <Col  md={6}>
                        <Container className="m-3 p-3 border-2 rounded-4 shadow border-dark">
                            <Row>
                                <Col md={"auto"}>
                                    <h3>Select User: </h3>
                                </Col>
                                <Col md={6}>
                                    <Select
                                        options={selectUserList}
                                        onChange={handleChange}
                                    />
                                </Col>
                            </Row>
                            <div className="tableContainer">
                            <Table striped bordered hover responsive variant="sm" className="table-bordered">
                                <thead>
                                <tr>
                                    <th>Chore Name</th>
                                    <th>Times per Week</th>
                                    <th> </th>
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
                            </div>
                            <Button variant={"outline-primary"} onClick={handleUnassignChores} className="m-2">Clear All Assignments</Button>
                        </Container>
                    </Col>
                </Row>
            </Container>



                <Link to={"/useradmin"}>to user admin</Link>

        </>
    )
}