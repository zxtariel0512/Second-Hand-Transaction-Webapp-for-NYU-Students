import { getListingByCategoryModel } from "../../Model/Listing/listingModel";

const getListingByCategory = async (name) => {
  try {
    const res = await getListingByCategoryModel(name);
    return { success: true, data: res.data };
  } catch (e) {
    console.error(e);
    return { success: false, message: e.message };
  }
};

export default getListingByCategory;
