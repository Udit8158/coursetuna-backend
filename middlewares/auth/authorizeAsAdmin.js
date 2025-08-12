const jwt = require("jsonwebtoken");

const authorizeAsAdmin = (req, res, next) => {
  try {
    const authToken = req.headers["auth-token"];
    if (!authToken)
      return res
        .status(401)
        .json({ success: false, data: "Unauthorized: no token has passed" });

    const result = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!result.role == "admin")
      return res.status(401).json({ success: false, data: "You're not admin" });
    next();
  } catch (error) {
    return res.status(500).json({ success: false, data: error });
  }
};

module.exports = authorizeAsAdmin;
