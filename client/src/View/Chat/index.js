import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import '../../chat.css';

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6ImM0Y2M5MjcyLWNhYWUtNGJjZi1iNWM3LTliNjg5NTIzOGQ2NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDUzMjY5NDAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTMzMDU0MCwiaWF0IjoxNjA1MzI2OTQwLCJqdGkiOiJjOTZmMmMyYS0xYzgzLTQwZjktOWU0My1mMzNmNTJlOWIwYWYiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.UVY9rH-kIPzGzOaBZ-sIjPUl2E4nH3GpdVPNtEj2sXCxbPNblqL9AOkWjKtnHTw21JKPTNFanNuisbtJadIaXtQI3rf1VXIpsG70U3v4UAefSNWxIMS4fDdjv7RSPGOosGR56nXLFpEMMn8rFqW9yXNBCtjFiQwdJsIxOwb-W2lJTyWWHUsIrfObe8rXcuFB36SYgQ5q3pEPe3F_BMY2EXr7sq6RBUM-elS-pND0CvPxoWdyWrfYD-iDmEUswT4lCQaMqJOhS5Cp8qgRGjAakqNqdfE2H5icZYWpwAcziml8m6fXLfF_mR8O4bNV3ENblESnVYUoeosVuUwSAndbTA"
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
                    return {...chat, lastMessage: msg.value}
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