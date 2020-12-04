import axios from "axios";
import { GET_PURCHASE } from "../config/apiConfig";

const getPurchaseModel = (sessionId, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_PURCHASE(sessionId), config);
};

export { getPurchaseModel };
