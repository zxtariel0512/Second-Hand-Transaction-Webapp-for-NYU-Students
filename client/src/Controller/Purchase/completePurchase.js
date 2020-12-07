import { completePurchaseModel } from "../../Model/Purchase/purchaseModel";

const completePurchase = async (id) => {
  try {
    const res = await completePurchaseModel(id);
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};
export default completePurchase;
