import axios from "axios";
import { GET_LISTING, GET_ONE_LISTING } from "../config/apiConfig";

// TODO: If we have the authentication, we can put the header here

/**
 * GET LIST API
 */
const getListingModel = () => {
  return axios.get(GET_LISTING);
};

const getOneListingModel = (id) => {
  return axios.get(GET_ONE_LISTING(id));
};

export { getListingModel, getOneListingModel };
