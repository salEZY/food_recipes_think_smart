const jwt = require("jsonwebtoken");

const userCheck = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).send("Authentication failed, no token provided.");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      userId: decodedToken._id,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).send("Invalid token.");
  }
};

const adminCheck = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(403).send("Authentication failed, no token provided.");
  }

  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  console.log(decodedToken);
  if (!decodedToken.admin)
    return res.status(403).send("Admin authentication failed.");
  next();
};

module.exports = {
  userCheck,
  adminCheck,
};
