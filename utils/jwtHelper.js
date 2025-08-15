const jwt = require("jsonwebtoken");
require("dotenv").config();

const createAdminAuthToken = (payload) => {
    console.log('creating')
    const jwtSecret = process.env.ADMIN_JWT_SECRET;
    const authToken = jwt.sign(payload, jwtSecret);
    // console.log(jwtSecret, authToken)
    return authToken;
};

const createUserAuthToken = (payload) => {
    const jwtSecret = process.env.USER_JWT_SECRET;
    const authToken = jwt.sign(payload, jwtSecret);
    // console.log(jwtSecret, authToken)
    return authToken;

};

const verifyAdminAuthToken = (authToken) => {
    const jwtSecret = process.env.ADMIN_JWT_SECRET;
    const result = jwt.verify(authToken, jwtSecret);
    // console.log(jwtSecret, result)
    return result;
}

const verifyUserAuthToken = (authToken) => {
    const jwtSecret = process.env.USER_JWT_SECRET;
    const result = jwt.verify(authToken, jwtSecret);
    return result;
};;

module.exports = { createAdminAuthToken, createUserAuthToken, verifyAdminAuthToken, verifyUserAuthToken };
