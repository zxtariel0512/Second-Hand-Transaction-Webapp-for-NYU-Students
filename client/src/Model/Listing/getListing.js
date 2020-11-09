import axios from "axios";
import { GET_LISTING } from "./getListing";


// TODO: If we have the authentication, we can put the header here

/**
 * Get all item list
 */
const getListing = () => {
    return axios.get(GET_LISTING)
}

export default getListing;