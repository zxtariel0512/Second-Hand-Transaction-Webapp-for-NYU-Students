import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
let socket;

export default function Index(props) {
    const [response, setResponse] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [chatId, setChatId] = useState(props.location.pathname.split("/")[2])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("joinChat", chatId)

        socket.on("welcome", data => {
            console.log(data); //setResponse(data)
        })
    }, [])

    useEffect(() => {
        socket.on("newMessage", msg => {
            setAllMessages([...allMessages, msg])
        })
    })

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSendMessage("");
        socket.emit("sendMessage", {
            chatId,
            value: sendMessage
        });
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
                {allMessages.map(msg => {
                    return <div>{msg.value} - {msg.time}</div>
                })}
            </div>
        </div>
    )
}