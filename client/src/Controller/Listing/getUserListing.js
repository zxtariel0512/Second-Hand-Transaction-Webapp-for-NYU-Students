import { getUserListingModel } from "../../Model/profileModel";
import ErrorMessage from "../../Context/MessageContext";

const getUserListing = async (netid, token) => {
  try {
    const res = await getUserListingModel(netid, token);
    console.log(res);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getUserListing;
