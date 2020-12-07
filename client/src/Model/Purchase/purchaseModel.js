import axios from "axios";
import createHeader from "Model/config/headerConfig";
import {
  GET_PURCHASE,
  GET_PURCHASE_BY_SELLER,
  COMPLETE_PURCHASE,
} from "../config/apiConfig";

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

const completePurchaseModel = async (id) => {
  return axios.put(COMPLETE_PURCHASE(id), {}, await createHeader());
};

export { getPurchaseModel, getPurchaseBySellerModel, completePurchaseModel };
