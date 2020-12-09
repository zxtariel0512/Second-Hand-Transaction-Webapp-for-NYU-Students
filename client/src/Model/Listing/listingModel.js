import axios from "axios";
import {
  GET_LISTING,
  GET_ONE_LISTING,
  POST_NEW_LISTING,
  GET_LISTING_BY_CATEGORY,
} from "../config/apiConfig";
import createHeader from "../config/headerConfig";

// TODO: If we have the authentication, we can put the header here

/**
 * GET LIST API
 */
const getListingModel = (config) => {
  const { pageNum, limit } = config;
  return axios.get(GET_LISTING(pageNum, limit));
};

const getOneListingModel = (id) => {
  return axios.get(GET_ONE_LISTING(id));
};

const postNewListingModel = async (data) => {
  return axios.post(POST_NEW_LISTING, data, await createHeader());
};

const getListingByCategoryModel = (name) => {
  return axios.get(GET_LISTING_BY_CATEGORY(name));
};

export {
  getListingModel,
  getOneListingModel,
  postNewListingModel,
  getListingByCategoryModel,
};
