import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style"
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(style)

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6IjgxYWE1ZTE5LWE1M2UtNDhhZi05MTZlLTgyMTEwZTk5ZTJiMCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDU0MTYzNDEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTQxOTk0MSwiaWF0IjoxNjA1NDE2MzQxLCJqdGkiOiJhOWY0N2VhMy0wMDA5LTRmNDktYjU5MS00NTI4OWE5ZTFkODMiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.C-Mi0u1tGXd-_8_cBgZkLXQLjB2FPmuk2I7CssonwYNGReRM6YSUiOee0DwR9hlOa8OtqXdzYLeD23W05v1azuStTEXwvR2cDeOecRfhtGj5le1NXMb7FHIbEKcxoWlHi9chwArUM1Oq1EMzjxxkOEUkF5WDe1nxpkJdMgoaXvy1AV4w2gv3Ejx7bs9kzEjp5kljfIOXdqIlaL77TTMznkFg8R4MxXqiMoIZDXdOKwVNz05RzcHf6kWaZj5ZzXv9Hh9z_8YIdoC_ReoEcAHxGNCGQKmsT-ve5XooJap2_7J7yowpHJyKIDLV346d3FmEz8N2zahOw1v0dADQH2OxVQ"
let socket;


export default function Index(props) {
    const classes = useStyles();
    const [response, setResponse] = useState("");
    const [sendMessage, setSendMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [chatId, setChatId] = useState(props.location.pathname.split("/")[2])
    const [chats, setChats] = useState([])

    useEffect(async () => {
        socket = io(ENDPOINT);

        let foundChats = await axios.get(ENDPOINT + "/chat", {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        }).then(res => res.data);

        setChats(foundChats)

        let messages = await axios.get(ENDPOINT + "/messages/" + chatId, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        }).then(res => res.data);

        setAllMessages(messages);

        socket.emit("joinChats", foundChats)

        socket.on("welcome", data => {
            console.log(data); //setResponse(data)
        })
    }, [])

    useEffect(() => {
        socket.off("newMessage")

        socket.on("newMessage", msg => {
            newMessage(msg);
        })
    }, [chatId, allMessages])

    const newMessage = (msg) => {
        console.log(chatId)
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
    }

    const changeChat = async (newChatId) => {
        //console.log(newChatId)
        setChatId(newChatId)

        let messages = await axios.get(ENDPOINT + "/messages/" + newChatId, {
            headers: {
                Authorization: 'Bearer ' + TOKEN
            }
        }).then(res => res.data);

        setAllMessages(messages);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSendMessage("");
        socket.emit("sendMessage", {
            chatId,
            value: sendMessage
        });
    }

    return (
        <>
            <CustomAppBar />
            <div className={classes.main}>
                <div className={classes.container}>
                    <Paper className={classes.chat} elevation={2}>
                        <div className={classes.chatList}>
                            {chats.map(chat => {
                                return (
                                    <List>
                                        <ListItem
                                            button
                                            component={Link}
                                            onClick={async () => await changeChat(chat._id)}
                                            to={"/chat/" + chat._id}
                                            selected={chat._id === chatId}
                                        >
                                        {/* <ListItem button component={Link} to="/home"> */}
                                            <ListItemText
                                                primary={chat.name}
                                                secondary={chat.lastMessage.value}
                                            />
                                        </ListItem>
                                    </List>
                                )
                            })}
                        </div>
                        <div className={classes.chatBox}>
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
                    </Paper>
                </div>
            </div>
        </>
    )
}