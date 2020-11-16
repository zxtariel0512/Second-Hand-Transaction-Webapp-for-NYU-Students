import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style"
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import Message from "../../Components/Chat/Message";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles(style)

const ENDPOINT = "http://localhost:4000";
const TOKEN = "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6ImVhOWY0NDAzLTMzMWYtNDIwOC05NTYwLWYxMjNjYjMxYzM3NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDU0OTU2NzEsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTQ5OTI3MSwiaWF0IjoxNjA1NDk1NjcxLCJqdGkiOiI4Njg1M2NkOS1lNDRkLTQ3YWItYjQ1Yi1iM2JkODIzZjZiZDYiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.ljy270F5MdiIzkMY_u-8ZonQhOye1ZRaDlKsPyZeikj-uZqtBx81EqKZydp6b6v2Wef8x5X7xSoL4v-SpM0aiF6tKGU3RfL6UlnavgaXm-zwTGCOBDhmqij0wKenQI9XUds6MITz6SebE9gXkhr9QlmKgqvaGF7wzcSWL6vxmSxEbFZ3mM8sYhnwCLK4MiY0lzcSW0bYGJo65QuNuClmZImce-Y5w7O9QsB3shwdzaobxRJ9R1bw6iUWlUjJHVQ5YlkdU_DFZycyH4kXRAD2nfu8AdC_OcvjkBWGPiAKHoxulWHNlYrQxr54VDtZxcYjVReMsXukmmaQ8ohtd8BugA"
let socket;

export default function Index(props) {
    const classes = useStyles();

    const messagesEndRef = useRef(null)

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

        scrollToBottom(false)
    }, [])

    useEffect(() => {
        socket.off("newMessage")

        socket.on("newMessage", msg => {
            newMessage(msg);
        })
    }, [chatId, allMessages])


    const newMessage = (msg) => {
        console.log(msg.value)
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

    const scrollToBottom = (smoothScroll) => {
        messagesEndRef.current.scrollIntoView({ behavior: smoothScroll ? "smooth" : "auto"});
    }

    useEffect(() => scrollToBottom(false), [allMessages]);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setSendMessage("");
        socket.emit("sendMessage", {
            chatId,
            author: "Matthew Fan",
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
                            <List disablePadding={true}>
                            {chats.map(chat => {
                                return (
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
                                )
                            })}
                            </List>
                        </div>

                        <div className={classes.chatBox}>
                            <div className={classes.chatBoxMessages}>
                                {allMessages.map(msg => {
                                    return <Message msg={msg} />
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className={classes.chatBoxInput}>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        placeholder="Message..."
                                        value={sendMessage}
                                        onChange={e => setSendMessage(e.target.value)}
                                        fullWidth
                                    />
                                    <IconButton aria-label="send" type="submit">
                                        <SendIcon />
                                    </IconButton>
                                </form>
                            </div>
                        </div>

                    </Paper>
                </div>
            </div>
        </>
    )
}