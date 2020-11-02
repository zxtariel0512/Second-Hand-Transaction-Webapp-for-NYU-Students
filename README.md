# Second-Hand-Transaction-Webapp-for-NYU-Students


## Setup
1. Use the command `npm install` to install all dependencies
1. Create a file called `.env` in the root directory and include the following in the file:

    ```
    MONGO_URI=your_mongo_uri
    ```

1. Use `npm run start` to run the server on `localhost:4000`

## Test MongoDB
1. Download MongoDB Compass, and enter the uri
2. Download postman
### Listing
1. Enter "http://localhost:4000/listings"
2. Choose "Get" -> "Send" to see all existing listings
3. Choose "Post", and then click on "Body" -> "Raw" -> "Json", type in information, "Send"
### User
1. Enter "http://localhost:4000/user"
2. Choose "Get" -> "Send" to see all existing listings
3. Add "/register" to the url in Step 1. Choose "Post", and then click on "Body" -> "Raw" -> "Json", type in information, "Send"
