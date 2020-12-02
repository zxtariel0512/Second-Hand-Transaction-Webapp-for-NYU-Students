import axios from "axios";
import { GET_CHATS, GET_ONE_CHAT, DELETE_CHAT } from "../config/apiConfig";

const getChatsModel = (token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_CHATS, config);
};

const getOneChatModel = (id, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_ONE_CHAT(id), config);
};

const deleteChatModel = (id, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  console.log(DELETE_CHAT(id));
  return axios.delete(DELETE_CHAT(id), config);
};

export { getChatsModel, getOneChatModel, deleteChatModel };
