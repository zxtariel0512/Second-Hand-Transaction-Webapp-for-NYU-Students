import axios from "axios";
import { GET_CATEGORY_BY_ID, GET_CATEGORY_LIST } from "../config/apiConfig";

/**
 * getCategoryList
 * @description Get List of categories based on levels
 * @param {String} level 1 / 2
 */
function getCategoryListModel(level) {
  return axios.get(GET_CATEGORY_LIST + level);
}

function getCategoryByIdModel(id) {
  return axios.get(GET_CATEGORY_BY_ID(id));
}

export { getCategoryListModel, getCategoryByIdModel };
