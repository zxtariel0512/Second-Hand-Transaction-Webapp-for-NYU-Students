import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import '../../chat.css';

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6IjYyNjA3NjA2LWNkMTAtNDIxMS1hNjBmLTRjOGJjMjU4MmFkOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDUzODA5ODMsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTM4NDU4MywiaWF0IjoxNjA1MzgwOTgzLCJqdGkiOiI0MWY5OWNiZC0yYTI2LTQ1ZGEtOTRmYi1lYzE2MmNiN2NhNWUiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.cwvdfRZ9pLScSdO5BtVQBTgbUhbgZ88iajbFxuNe8MYWj86afeXKwEjmcuOG4KP7GI1FlUtPdqcB-7Mz-xydvm5Vy-BrofoGRYWYu298J9Itg8dnuvAKJUHd_4OBSGWV_tuljdB2hrN8OR444icVUUgoFYN5mypDE5_6hl0GpMkBHhnovKV_CvFGt0U0vBes8WTXIpt4oQHFIDQOCpEp9nL2Ve4zC7Gp0oyPedFh8mUvuoVEBLebhtxPRPQ-KQQdzO3-HFVS6F4dAGdTB8k8acg84TgQRPtUpb-7VcfFInsENe48jjyxDIHv_trTzneYYwQIt4lhYpnw6jGZG-tA_g"
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

        let messages = await axios.get(ENDPOINT + "/messages/" + chatId, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        }).then(res => res.data);

        setAllMessages(messages);

        socket.emit("joinChats", chats)

        socket.on("welcome", data => {
            console.log(data); //setResponse(data)
        })
    }, [])

    useEffect(() => {
        socket.on("newMessage", msg => {
            if (msg.chatId == chatId) {
                setAllMessages([...allMessages, msg])
            }

            let newChats = chats.map(chat => {
                if (chat._id == msg.chatId) {
                    return {...chat, lastMessage: msg}
                } else {
                    return {...chat}
                }
            })

            setChats(newChats)
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
                                {chat.lastMessage.value}
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