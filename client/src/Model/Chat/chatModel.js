import axios from "axios";
import {
  GET_CHATS,
  GET_ONE_CHAT,
  DELETE_CHAT,
  CREATE_CHAT,
} from "../config/apiConfig";
import createHeader from "../config/headerConfig";

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
  return axios.delete(DELETE_CHAT(id), config);
};

const createChatModel = async (data) => {
  return axios.post(CREATE_CHAT, data, await createHeader());
};

export { getChatsModel, getOneChatModel, deleteChatModel, createChatModel };
