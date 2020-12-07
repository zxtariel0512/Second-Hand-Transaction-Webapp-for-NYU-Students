import { createChatModel } from "../../Model/Chat/chatModel";
import ErrorMessage from "../../Context/MessageContext";

const createChat = async (data) => {
  try {
    const res = await createChatModel(data);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default createChat;
