import { getCategoryListModel } from "../../Model/category/categoryModel";

/**
 * Get Category Controller
 * @param {*} level
 */
async function getCategory(level) {
  try {
    const res = await getCategoryListModel(level);
    return { success: true, data: res.data };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

export default getCategory;
