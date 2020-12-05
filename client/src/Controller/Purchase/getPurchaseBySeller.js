import { getPurchaseBySellerModel } from "../../Model/Purchase/purchaseModel";

const getPurchaseBySeller = async (netid, token) => {
  try {
    const res = await getPurchaseBySellerModel(netid, token);
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};
export default getPurchaseBySeller;
