import axios from "axios";

const BASE_URL = "http://localhost:4000";
const createAxios = axios.create({ baseURL: BASE_URL });

const request = async ({ ...config }) => {
  return createAxios(config)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
export default request;
