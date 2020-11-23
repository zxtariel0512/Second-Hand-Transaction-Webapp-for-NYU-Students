import { getChatsModel } from "../../Model/Chat/chatModel";
import ErrorMessage from "../../Context/MessageContext";

const getChats = async () => {
  try {
    const res = await getChatsModel();
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getChats;
