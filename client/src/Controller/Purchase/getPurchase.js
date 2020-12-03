import { getPurchaseModel } from "../../Model/Purchase/purchaseModel";
import ErrorMessage from "../../Context/MessageContext";

const getPurchase = async (sessionId, token) => {
  try {
    const res = await getPurchaseModel(sessionId, token);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getPurchase;
