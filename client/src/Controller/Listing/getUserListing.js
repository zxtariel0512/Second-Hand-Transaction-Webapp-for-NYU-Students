import { getUserListingModel } from "../../Model/profileModel";
import ErrorMessage from "../../Context/MessageContext";

const getUserListing = async (netid) => {
  try {
    const res = await getUserListingModel(netid);
    console.log(res);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getUserListing;
