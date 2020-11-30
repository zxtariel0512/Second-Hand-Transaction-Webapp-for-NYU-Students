import { getOneChatModel } from "../../Model/Chat/chatModel";
import ErrorMessage from "../../Context/MessageContext";

const getOneChat = async (id, token) => {
  try {
    const res = await getOneChatModel(id, token);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getOneChat;
