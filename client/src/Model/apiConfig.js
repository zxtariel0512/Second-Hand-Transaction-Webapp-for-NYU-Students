/*
 *  List All The Endpoints Here
 *  Use createAPI() function to create the endpoints
 */

const BASE_URL = "http://localhost:4000";
const createAPI = (endpoint) => `${BASE_URL}${endpoint}`;

const GET_LISTING = createAPI("/listings");

export { GET_LISTING };
