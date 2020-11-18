/*
 *  List All The Endpoints Here
 *  Use createAPI() function to create the endpoints
 *  If we have the header, just pass in the header
 */
import Header from "./headerConfig";
const BASE_URL = "http://localhost:4000";
const createAPI = (endpoint) => `${BASE_URL}${endpoint}`;

const GET_LISTING = createAPI("/listings");
const GET_ONE_LISTING = (id) => createAPI(`/listings/${id}`);
const GET_PROFILE = (netid) => createAPI(`/user/${netid}`);
const GET_USER_LISTING = (netid) => createAPI(`/listings/netid/${netid}`);
export { GET_LISTING, GET_ONE_LISTING, GET_PROFILE, GET_USER_LISTING };
