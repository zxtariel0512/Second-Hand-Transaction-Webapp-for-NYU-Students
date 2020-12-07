import axios from "axios";
import { CHECKOUT } from "../config/apiConfig";
import createHeader from "../config/headerConfig";

const checkoutModel = async (data) => {
  return axios.post(CHECKOUT, data, await createHeader());
};

export { checkoutModel };
