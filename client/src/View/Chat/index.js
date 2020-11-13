import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import '../../chat.css';

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6IjZkMWVmODZmLTdiNzAtNGYwZS05OGNjLTg5NzEyMWQ1ODUyNCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDUyOTkwMzYsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTMwMjYzNiwiaWF0IjoxNjA1Mjk5MDM2LCJqdGkiOiJjMmU4ZmUwMS0xNThlLTRhYTAtOWQ1Yi1iOWE5NDE2YTFmYTMiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.c29UeSIFTQ2oznzbWpwAjtql8mWegiLAIThDRcCEU1ttlx4jsTA8-NrHkU8CY63nUnr5NubVwztPt_JuJtTcqPaTHE4X6wBZwdxzi69P4IIdACqc_lBeMQ8vwct9FxqYZgmR6gfwPNKZrB3lnTbKFuupOYNR_EmmVFLResqSwYpF2SXHTq0b5WIjd86nHqWZcYpCwl8Uf8P49uDbScbCpbtfdSo3ncCq-37jaif2tu1WjEk9Bx9KAKl0jq8l93cK3w3_P5IHsTcT1TcYbzKPWfA3_Zbx1YjtAEW--pEluzh8TylCo0Lzj8jL3gJjytuFu6XFKdiI7HwYPOXGANdPRg"
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

        socket.emit("joinChats", chats)

        socket.on("welcome", data => {
            console.log(data); //setResponse(data)
        })
    }, [])

    useEffect(() => {
        socket.on("newMessage", msg => {
            if (msg.chatId == chatId) {
                setAllMessages([...allMessages, msg])
            } else {
                let newChats = chats.map(chat => {
                    if (chat._id == msg.chatId) {
                        return {...chat, lastMessage: msg.value}
                    } else {
                        return {...chat}
                    }
                })
                setChats(newChats)
            }
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
                            <div>
                                {chat.lastMessage}
                            </div>
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