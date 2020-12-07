import { deleteListingModel } from "../../Model/Listing/listingModel";
import ErrorMessage from "../../Context/MessageContext";

const deleteListing = async (id, token) => {
  try {
    const res = await deleteListingModel(id, token);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default deleteListing;
