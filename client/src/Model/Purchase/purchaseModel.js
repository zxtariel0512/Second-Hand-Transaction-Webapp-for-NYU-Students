import axios from "axios";
import { GET_PURCHASE, GET_PURCHASE_BY_SELLER } from "../config/apiConfig";

const getPurchaseModel = (sessionId, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_PURCHASE(sessionId), config);
};

const getPurchaseBySellerModel = (netid, token) => {
  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  return axios.get(GET_PURCHASE_BY_SELLER(netid), config);
};

export { getPurchaseModel, getPurchaseBySellerModel };
