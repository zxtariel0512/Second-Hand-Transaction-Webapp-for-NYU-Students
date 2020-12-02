const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const axios = require("axios");
require("dotenv").config();

let jsonWebKeys;

axios.get(`https://cognito-idp.us-east-1.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`)
  .then(res => {
    jsonWebKeys = res.data.keys;
  })

module.exports = {
  auth: async (req, res, next) => {
    const authHeader = req.header('Authorization')
    if (!authHeader || authHeader.split(' ')[0] != 'Bearer' || authHeader.split(' ').length != 2) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    // Check for token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // decodes the jwt so that we can get the 'kid' from the header
      const decodedJwt = jwt.decode(token, { complete: true });

      // find the 'kid' within the public keys that aws gives us (located in jsonWebKeys)
      const jwk = jsonWebKeys.find(jwk => jwk.kid === decodedJwt.header.kid);

      // pem will contain the public key needed to verify the jwt
      const pem = jwkToPem(jwk);

      const decoded = jwt.verify(token, pem);

      req.user = {
        id: decoded.sub,
        username: decoded["cognito:username"]
      }

      next();
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Token is not valid' });
    }

  }
}