import axios from "axios";
import { UPDATE_USER, LOGIN_USER } from "../config/apiConfig";
import createHeader from "../config/headerConfig";

// /**
//  * GET USER BY NETID API
//  */
// const updateUserModel = (netid) => {
//   return axios.put(GET_USER(netid), updatedUser, config);
// };

/**
 * UPDATE USER API
 */
const updateUserModel = (netid, updatedUser, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.put(UPDATE_USER(netid), updatedUser, config);
};

const loginUserModel = async (netid) => {
  return axios.put(LOGIN_USER(netid), {}, await createHeader());
};

export { updateUserModel, loginUserModel };
