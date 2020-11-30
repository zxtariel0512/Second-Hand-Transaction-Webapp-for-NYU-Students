import axios from "axios";
import { GET_CHATS, GET_ONE_CHAT } from "../config/apiConfig";

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

export { getChatsModel, getOneChatModel };
