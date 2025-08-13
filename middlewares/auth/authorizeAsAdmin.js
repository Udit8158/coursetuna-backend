const { verifyAuthToken } = require("../../utils/jwtHelper");

const authorizeAsAdmin = (req, res, next) => {
  try {
    const authToken = req.headers["auth-token"];
    if (!authToken)
      return res
        .status(401)
        .json({ success: false, data: "Unauthorized: no token has passed" });

    const result = verifyAuthToken(authToken);
    if (!result.role == "admin")
      return res.status(401).json({ success: false, data: "You're not admin" });
    next();
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

const authorizeAsUser = (req, res, next) => {
  try {
    const authToken = req.headers["auth-token"];
    if (!authToken)
      return res
        .status(401)
        .json({ success: false, data: "Unauthorized: no token has passed" });

    const result = verifyAuthToken(authToken);
    if (!result.role == "user")
      return res.status(401).json({ success: false, data: "You're not user" });

    // set the user in the header
    req.headers.user = result;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

module.exports = { authorizeAsAdmin, authorizeAsUser };
