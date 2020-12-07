import { checkoutModel } from "../../Model/Checkout/checkoutModel";
import ErrorMessage from "../../Context/MessageContext";

const checkout = async (data) => {
  try {
    const res = await checkoutModel(data);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default checkout;
