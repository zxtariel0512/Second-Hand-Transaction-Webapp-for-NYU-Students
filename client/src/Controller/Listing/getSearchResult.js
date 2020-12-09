import { getSearchResultModel } from "../../Model/Listing/listingModel";
import ErrorMessage from "../../Context/MessageContext";

const getSearchResult = async (value) => {
  try {
    const res = await getSearchResultModel(value);
    // Do all the data manipulation here
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getSearchResult;
