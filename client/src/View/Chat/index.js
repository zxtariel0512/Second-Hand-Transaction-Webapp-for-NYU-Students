import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import '../../chat.css';

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6ImU2YWM1MjQ3LWE4NjEtNDRhYi1hMGRmLWViNzgwZWRjMWNiNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDUyOTUyOTcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTI5ODg5NywiaWF0IjoxNjA1Mjk1Mjk3LCJqdGkiOiIyZmJmZmIwNS03NjE2LTRkMWMtOTAxNi1kMWFkMzliMWNhMmUiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.UFoWUOCUvN5EJkJllDQSEQ5gtp2ThtDGUfQIewhzvmrajqoopVNGqB5v5-7RAgZN5rguFMilBSHz_tTcH3SuHcn_TEeSsyKfZoOT1dLRdcczAtY_0Vn5Fh2QyUQKQKzkkQPnTpWdEnFr0YjlvKoMjQwHpaDgp2SRUug5gn03Yq-GrjSabjhi6jYB7uH7Xlog080BN0FMCHs41Z-v-nZepb8qp792HFgu7od8UjmKhjrCZ8ngi38GcdiSS_uKRd6BXDUU2tk4gjtlUL98zDy3Wa3rMlqxhe5fNUjS8LG28ySk3PaUyi050DRjio4dRvX_-zPSXrrqSRIGS4_X6HdVew"
let socket;

export default function Index(props) {
    const [response, setResponse] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [chatId, setChatId] = useState(props.location.pathname.split("/")[2])
    const [chats, setChats] = useState([])

    useEffect(async () => {
        socket = io(ENDPOINT);

        let chats = await axios.get(ENDPOINT + "/chat", {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        }).then(res => res.data);

        setChats(chats)

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
        <div className="main">
            <div className="chat-list">
                {chats.map(chat => {
                    return (
                        <div>
                            <a href={"http://localhost:3000/chat/" + chat._id}>{chat.name}</a>
                        </div>
                    )
                })}
            </div>
            <div className="chat-box">
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
        </div>
    )
}