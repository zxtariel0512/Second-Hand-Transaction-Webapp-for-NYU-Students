import axios from "axios";
import { GET_PROFILE } from "./config/apiConfig";

/**
 * GET PROFILE API
 */
const getProfileModel = (netid) => {
  console.log(GET_PROFILE(netid));
  return axios.get(GET_PROFILE(netid));
};

export { getProfileModel };
