import React from "react";
import {Container} from "react-bootstrap";

type MessageProps = {
    groupId: number
}

export const Messages = (props: MessageProps) => {


    return(
        <Container className="m-3 mt-5 shadow-lg rounded-4">
            <h3>Messages</h3>
        </Container>
    )
}