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
  isAuthenticated: async (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    // Check for token
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      const decodedJwt = jwt.decode(token, { complete: true });

      const jwk = jsonWebKeys.find(jwk => jwk.kid === decodedJwt.header.kid);
      const pem = jwkToPem(jwk);

      const decoded = jwt.verify(token, pem);

      req.user = {
        id: decoded.sub,
        username: decoded.username
      }

      next();
    } catch (err) {
      console.log(err)
      res.status(400).json({ message: 'Token is not valid' });
    }

  }
}