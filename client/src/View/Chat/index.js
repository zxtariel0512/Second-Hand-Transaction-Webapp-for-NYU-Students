import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import style from "./style";
import CustomAppBar from "../../Components/CustomAppBar/CustomAppBar";
import Message from "../../Components/Chat/Message";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles(style);

const ENDPOINT = "http://localhost:4000";
const TOKEN =
  "eyJraWQiOiJiY3RTVUJrTVloTVRuQ05cLzJiUXVTNEZwYUhOb0EyT0xcLzN5STRYNWFMNU09IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiI4NzVlZGMyMC0wNjZlLTQwNzEtODFhYS0zYjEyODgyNGY2MDciLCJldmVudF9pZCI6ImY3Nzk5MTMyLTc5NTctNGJhMy1iN2M0LWU3Y2YyMzkwZjJhYSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MDU1MDU0OTQsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX2FBeTkyMkxaMiIsImV4cCI6MTYwNTUwOTA5NCwiaWF0IjoxNjA1NTA1NDk0LCJqdGkiOiI3MjZmMDE0Mi04ZjdlLTQyYTEtYTIyYS02NGQ4YWJhMGVjZjIiLCJjbGllbnRfaWQiOiIzNWltcDZpNHFqNTI0aW9qZWcxYWNqbHBkciIsInVzZXJuYW1lIjoibXJmNDQxIn0.uYy3Azgj2A_OoFaAFxQEC1xstSl368S9puvp5tmKUOflwuX-f8DiuOjlI8HfRiNPknnEWCiPm7QGEigLzR6KGTe8Q1nksa0eHbML3Ls9V05NeLYPJkJ5iqtZxfT46MJiBScWh2RIxiA8CNIFkTh-2ZbAU4wWUkE-uI7SxSdfl15HSGeKJY3f91Fq9KlzC0M2GWTIZ46hk0uwKdt2eRz5ITLf3uiST_Z9RktD7LbT-kz_Acxup12v6TVVUhnTm_hZb71b-IEvbFDBDgUl6_6KbHaLzBAb-qI4lCvqtyCx8w9W7pHmT_ILUxc-3Nanbd6ZSIQwod1-HIWWew40VYXd4Q";
let socket;

export default function Index(props) {
  const classes = useStyles();

  const messagesEndRef = useRef(null);

  const [sendMessage, setSendMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chatId, setChatId] = useState(props.location.pathname.split("/")[2]);
  const [currChat, setCurrChat] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(async () => {
    socket = io(ENDPOINT);

    let foundChats = await axios
      .get(ENDPOINT + "/chat", {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((res) => res.data);

    setChats(foundChats);

    if (chatId == "new") {
      const { listingInfo } = props.location;
      console.log(listingInfo);
      setCurrChat({
        name: listingInfo.title,
      });
    } else {
      let chat = await axios
        .get(ENDPOINT + "/chat/" + chatId, {
          headers: {
            Authorization: "Bearer " + TOKEN,
          },
        })
        .then((res) => res.data);

      setCurrChat(chat);
      setAllMessages(chat.messages);
    }

    socket.emit("joinChats", foundChats);

    socket.on("welcome", (data) => {
      console.log(data); //setResponse(data)
    });

    scrollToBottom(false);
  }, []);

  useEffect(() => {
    socket.off("newMessage");

    socket.on("newMessage", (msg) => {
      newMessage(msg);
    });
  }, [chatId, allMessages]);

  const newMessage = (msg) => {
    console.log(msg.value);
    if (msg.chatId == chatId) {
      setAllMessages([...allMessages, msg]);
    }

    let newChats = chats.map((chat) => {
      if (chat._id == msg.chatId) {
        return { ...chat, lastMessage: msg };
      } else {
        return { ...chat };
      }
    });

    setChats(newChats);
  };

  const changeChat = async (newChatId) => {
    //console.log(newChatId)
    setChatId(newChatId);

    let chat = await axios
      .get(ENDPOINT + "/chat/" + newChatId, {
        headers: {
          Authorization: "Bearer " + TOKEN,
        },
      })
      .then((res) => res.data);

    setCurrChat(chat);
    setAllMessages(chat.messages);
  };

  const scrollToBottom = (smoothScroll) => {
    messagesEndRef.current.scrollIntoView({
      behavior: smoothScroll ? "smooth" : "auto",
    });
  };

  useEffect(() => scrollToBottom(false), [allMessages]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSendMessage("");

    if (chatId == "new") {
      const newChat = await axios
        .post(
          ENDPOINT + "/chat",
          {
            name: props.location.listingInfo.title,
          },
          {
            headers: {
              Authorization: "Bearer " + TOKEN,
            },
          }
        )
        .then((res) => res.data);

      socket.emit("joinNewChat", newChat._id);

      setChatId(newChat._id);
      socket.emit("sendMessage", {
        chatId: newChat._id,
        author: "Matthew Fan",
        value: sendMessage,
      });

      setChats([...chats, newChat]);

      props.history.push("/chat/" + newChat._id);
    } else {
      socket.emit("sendMessage", {
        chatId,
        author: "Matthew Fan",
        value: sendMessage,
      });
    }
  };

  return (
    <>
      <CustomAppBar />
      <div className={classes.main}>
        <div className={classes.container}>
          <Paper className={classes.chat} elevation={2}>
            <div className={classes.chatList}>
              <List disablePadding={true}>
                {chats.map((chat) => {
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
                  );
                })}
              </List>
            </div>

            <div className={classes.chatBox}>
              <div className={classes.chatBoxHeader}>{currChat.name}</div>
              <div className={classes.chatBoxMessages}>
                {allMessages.map((msg) => {
                  return <Message msg={msg} />;
                })}
                <div ref={messagesEndRef} />
              </div>
              <div className={classes.chatBoxInput}>
                <form onSubmit={handleSubmit}>
                  <Input
                    placeholder="Message..."
                    value={sendMessage}
                    onChange={(e) => setSendMessage(e.target.value)}
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
  );
}
