import axios from "axios";
import { GET_CHATS, GET_ONE_CHAT } from "../config/apiConfig";

const getChatsModel = () => {
  return axios.get(GET_CHATS);
};

const getOneChatModel = (id) => {
  return axios.get(GET_ONE_CHAT(id));
};

export { getChatsModel, getOneChatModel };
