import axios from "axios";
import { UPDATE_USER } from "../config/apiConfig";

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

export { updateUserModel };
