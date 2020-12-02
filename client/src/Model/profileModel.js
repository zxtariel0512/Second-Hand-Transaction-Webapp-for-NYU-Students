import axios from "axios";
import { GET_PROFILE, GET_USER_LISTING } from "./config/apiConfig";
/**
 * GET PROFILE API
 */
const getProfileModel = (netid) => {
  return axios.get(GET_PROFILE(netid));
};

// GET USER LISTING API
const getUserListingModel = (netid, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_USER_LISTING(netid), config);
};

export { getProfileModel, getUserListingModel };
