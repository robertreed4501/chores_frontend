import React, {SyntheticEvent, useContext, useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {AuthContext} from "../context/AuthProvider";
import axios from "../api/axios";
import {AddChoreModal} from "./AddChoreModal";
import {NewMessageModal} from "./NewMessageModal";

type MessageProps = {
    groupId: number
}

type Message = [{
    id: number
    userIdTo: number
    userIdFrom: number
    subject: string
    body: string
    sentAt: string
    readAt: string
    hasBeenRead: boolean
}]

export const Messages = (props: MessageProps) => {

    const [selectedConvo, setSelectedConvo] = useState<number | undefined>();
    const [messages, setMessages] = useState<Message>([{
        body: "",
        hasBeenRead: false,
        id: 0,
        readAt: "",
        sentAt: "",
        subject: "",
        userIdFrom: 0,
        userIdTo: 0
    }]);
    const [userIdTo, setUserIdTo] = useState<number | undefined>(undefined);
    const [userIdFrom, setUserIdFrom] = useState<number | undefined>(undefined);
    const [messageSubject, setMessageSubject] = useState<string>('');
    const [messageBody, setMessageBody] = useState<string>('');
    // @ts-ignore
    const [auth, setAuth] = useContext(AuthContext);

    const getMessages = async () => {
        const response = await axios.get("/api/messages?id=" + auth.id, {withCredentials: false, headers:{'key': auth.key}})
        setMessages(response.data);
    }



    //@ts-ignore
    useEffect(() => {
        getMessages();

    }, [])


    return(
        <Container className="m-3 mt-5 shadow-lg rounded-4">
            <h3>Messages</h3>
            {messages.map(message =>
                <Container className="rounded-3 shadow m-3">
                    <h4>{message.subject}</h4>
                    <p>{message.body}</p>
                </Container>)}
            <NewMessageModal />
        </Container>
    )
}