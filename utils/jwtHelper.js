const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAuthToken = (payload) => {
  const jwtSecret = process.env.JWT_SECRET;
  const authToken = jwt.sign(payload, jwtSecret);
  return authToken;
};

const verifyAuthToken = (authToken) => {
  const jwtSecret = process.env.JWT_SECRET;
  const result = jwt.verify(authToken, jwtSecret);
  return result;
};

module.exports = { createAuthToken, verifyAuthToken };
