const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("Authentication failed, no token provided.");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("Invalid token.");
  }
};
