import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import Cookies from "js-cookie";
import Select from "react-select";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {AdminContext} from "../context/AdminProvider";
import {Link, useNavigate} from "react-router-dom";
import {AddChoreModal} from "../components/AddChoreModal";
import {EditChoreModal} from "../components/EditChoreModal";

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
        multiplier: number
        selected: boolean
        description: string
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
    const [choreList, setChoreList] = useState<ChoreListType>([{
        id: 0,
        name:"",
        multiplier: 1, selected: false, description:''}]);
    const [searchText, setSearchText] = useState<string>('');
    const [selectedChores, setSelectedChores] = useState<number[]>([]);
    const [rerender, setRerender] = useState(false);
    const [isDashboardSet, setIsDashboardSet] = useState(false);
       // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);
    // @ts-ignore
    const [dashboard, setDashboard] = useContext<dashCard>(AdminContext);

    const key = Cookies.get('key');

    //get all users in group to list in dropdown
    const getUserList = async (userId: number | undefined) => {

        await axios.get('/api/user/mygroup?id=' + auth.groupId,
            // @ts-ignore
            {withCredentials: false, headers:{'key': key}})
            .then(
                (response) => {
                    setUserList(response.data);
            }
        ).catch((error) => console.log(error));
    }

    const getChoreList = async (groupId: number | undefined) => {

        await axios.get('/api/chores/mygroup?id=' + auth.groupId,
            // @ts-ignore
            {withCredentials: false, headers:{'key': key.toString()}})
            .then(
                (response) => {
                    setChoreList(response.data);
            }
        ).catch((error) => console.log(error));
    }


    useEffect(() =>{
        if (auth.groupId){
            getResponse();
            getUserList(auth.id).then(() => null);
            getChoreList(auth.groupId).then(() => null);
        }

    },[auth])

    let selectUserList: selectedUserList = [{value: 0, label: ""}];
    userList?.forEach(user => {
        selectUserList.push({value:user.id, label:user.firstName + " " + user.lastName});
    })

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    }

    // @ts-ignore
    const handleChange = (selectedOption) => {
        setSelectedUser({id: selectedOption.value, name: selectedOption.label});
        //
    }

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        let tempSelectedChores: number[];
        tempSelectedChores = selectedChores;
        let tempChoreList = choreList;
        const id = parseInt(event.target.id)
        if (event.target.checked) {
            tempSelectedChores.push(parseInt(event.target.id));
            setSelectedChores(tempSelectedChores);
            tempChoreList.forEach( chore => {
                chore.id === id ? chore.selected = true : chore.selected = chore.selected;

            })
            setChoreList(tempChoreList);
        }
        else /*if (!event.target.checked)*/{
            let currIndex = selectedChores.indexOf(parseInt(event.target.id));
            setSelectedChores((products) => products.filter((_, index) => index !== currIndex));
            tempChoreList.forEach( chore => {
                chore.id === id ? chore.selected = false : chore.selected = chore.selected;
            })
            setChoreList(tempChoreList);
        }
        console.log(selectedChores);
        setRerender(!rerender);
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
        let tempChoreList = choreList;
        tempChoreList.forEach( chore => {
            chore.selected = false;
        })




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
        // @ts-ignore
        setDashboard(response.data);

    }

    const handleDeleteChore = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const response = await axios.delete("/api/chores/delete/" + event.currentTarget.id);
        alert(response.data)
        await getChoreList(auth.groupId);
    }

    const handleUnassignChores = async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (selectedUser !== undefined){
            const response = await axios.delete("/api/assignments/delete/" + selectedUser?.id);
            alert(response.data)
            await getResponse();
        }

    }


    const getResponse = async () => {
        const response = await axios.get('/api/dashboard',
            {withCredentials: false, headers:{'key': auth.key}});


                console.log("setting data - dashboard.tsx getResponse()");
                // @ts-ignore
        setDashboard(response.data);

        setIsDashboardSet(true);

    }

    const setNewChoreList = (choreList: ChoreListType) : void=> {
        setChoreList(choreList);
    }

    const handleLoadSampleChores = async () => {
        const response = await axios.post("/api/chores/loadsamples/" + auth.groupId);
        setChoreList(response.data);
    }

    if (!isDashboardSet){
        return(
            <>
                <h3>
                    Loading.....
                </h3>
            </>
        )
    }

    return (
        <Container className="p-3 bg-body mt-4 text-center">
            <Container className="p-3 border-light border-2 rounded-4 shadow">
                <Row className="my-auto">
                    <h3>Assign Chores</h3>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col md={6}>
                        <Container className="mt-3 p-3 border-2 rounded-4 shadow"><>
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
                                    <thead className="tableHeadPersistent">
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
                                                                id={chore.id.toString()}
                                                                onChange={
                                                                (e: React.ChangeEvent<HTMLInputElement>) =>
                                                                    handleCheck(e)}
                                                                checked={chore.selected}

                                                            />
                                                        </Form></td>
                                                    <td>{chore.name}</td>
                                                    <td>{chore.multiplier.toString()}</td>
                                                    <td>
                                                        <EditChoreModal
                                                            id={chore.id}
                                                            name={chore.name}
                                                            multiplier={chore.multiplier}
                                                            description={chore.description}
                                                            setNewChoreList={setNewChoreList}
                                                        />
                                                        <Button
                                                            variant={"outline-primary"}
                                                            id={chore.id.toString()}
                                                            value={"delete"}
                                                            onClick={handleDeleteChore}
                                                            className="ms-1"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </td>
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
                                                        <td><EditChoreModal
                                                            id={chore.id}
                                                            name={chore.name}
                                                            multiplier={chore.multiplier}
                                                            description={chore.description}
                                                            setNewChoreList={setNewChoreList}
                                                        />
                                                        <Button
                                                            variant={"outline-primary"}
                                                            id={chore.id.toString()}
                                                            value={"delete"}
                                                            onClick={handleDeleteChore}
                                                        >
                                                            Delete
                                                        </Button>
                                                        </td>
                                                    </tr>)
                                            }
                                        }
                                        ;}
                                    )}

                                    </tbody>
                                </Table>

                            </div>
                            <AddChoreModal getChoreList={getChoreList}/>
                            <Button variant={"outline-primary"} onClick={handleAssignChores} className="m-2">
                                Assign Chores to {selectedUser?.name}</Button>
                            <Button
                                variant={"outline-primary"}
                                onClick={handleLoadSampleChores}
                                className="m-2"
                            >L
                                oad Sample Chores
                            </Button>
                        </>
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
                                        defaultMenuIsOpen={true}
                                    />
                                </Col>
                            </Row>
                            <div className="tableContainer">
                            <Table striped variant="sm" className="table-bordered table-light">
                                <thead className="tableHeadPersistent">
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
                                                        <td>
                                                            <Button
                                                                variant={"outline-primary"}
                                                                id={choreArray.at(0)?.assignmentId}
                                                                value={"delete"} onClick={handleDelete}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </td>
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
                            <Button
                                variant={"outline-primary"}
                                onClick={handleUnassignChores}
                                className="m-2"
                            >
                                Clear All Assignments
                            </Button>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}