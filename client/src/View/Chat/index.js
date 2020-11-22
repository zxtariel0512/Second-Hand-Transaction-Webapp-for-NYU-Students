import React, { useState, useEffect, useRef, useContext } from "react";
import io from "socket.io-client";

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
import MessageContext from "../../Context/MessageContext";

import getChats from "../../Controller/Chat/getChats";
import getOneChat from "../../Controller/Chat/getOneChat";

const useStyles = makeStyles(style);

const ENDPOINT = "http://localhost:4000";
let socket;

export default function Index(props) {
  const { setError } = useContext(MessageContext);
  const classes = useStyles();

  const messagesEndRef = useRef(null);

  const [sendMessage, setSendMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [chatId, setChatId] = useState(props.location.pathname.split("/")[2]);
  const [currChat, setCurrChat] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(async () => {
    socket = io(ENDPOINT);

    const getAllChats = async () => {
      const res = await getChats();
      // show error if request is failed
      res.success ? setChats(res.data) : setError(res.message);
      socket.emit("joinChats", res.data);
    };
    getAllChats();

    if (chatId == "new") {
      const { listingInfo } = props.location;
      console.log(listingInfo);
      setCurrChat({
        name: listingInfo.title,
      });
    } else {
      getThisChat(chatId);
    }

    socket.on("welcome", (data) => {
      console.log(data); //setResponse(data)
    });

    scrollToBottom(false);
  }, []);

  useEffect(() => {
    socket.off("newMessage");
    socket.off("newChat");

    socket.on("newMessage", (msg) => {
      newMessage(msg);
    });

    socket.on("newChat", (data) => {
      setChatId(data.chat._id);
      setCurrChat(data.chat);
      setAllMessages(data.chat.messages);
      setChats([...chats, data.chat]);

      props.history.push("/chat/" + data.chat._id);
    });
  }, [chatId, allMessages, chats]);

  const getThisChat = async (id) => {
    const res = await getOneChat(id);
    // show error if request is failed
    res.success ? setCurrChat(res.data) : setError(res.message);
    setAllMessages(res.data.messages);
  };

  const newMessage = (msg) => {
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
    setChatId(newChatId);
    getThisChat(newChatId);
  };

  const scrollToBottom = (smoothScroll) => {
    messagesEndRef.current.scrollIntoView({
      behavior: smoothScroll ? "smooth" : "auto",
    });
  };

  useEffect(() => scrollToBottom(false), [allMessages]);

  const createNewChat = (newMessageValue) => {
    const { listingInfo } = props.location;
    socket.emit("createChat", {
      message: {
        author: "mrf441",
        value: newMessageValue,
      },
      chat: {
        name: listingInfo.title,
        participants: ["mrf441", listingInfo.user_id],
      },
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setSendMessage("");

    if (chatId == "new") {
      createNewChat(sendMessage);
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
