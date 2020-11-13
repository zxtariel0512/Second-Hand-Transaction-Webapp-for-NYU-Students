import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

export default function Index(props) {
    const [response, setResponse] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [roomId, setRoomId] = useState("")

    useEffect(() => {
        setRoomId(props.location.pathname.split("/")[2])
        socket = io(ENDPOINT); socket.on("welcome", data => {
            console.log(data); //setResponse(data)
        })
    }, [])

    useEffect(() => {
        socket.on("newMessage", message => {
            setAllMessages([...allMessages, message])
        })
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSendMessage("");
        socket.emit("sendMessage", sendMessage);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sendMessage}
                    onChange={e => setSendMessage(e.target.value)}
                />
                <input type="submit" value="Submit"/>
            </form>

            <div>
                {allMessages.map(message => {
                    return <div>{message}</div>
                })}
            </div>
        </div>
    )
}