import { getOneListingModel } from "../../Model/Listing/listingModel";
import ErrorMessage from "../../Context/MessageContext";

const getOneListing = async (id) => {
  try {
    const res = await getOneListingModel(id);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getOneListing;
