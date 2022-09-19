require("dotenv").config();
const jwt = require('jsonwebtoken');

const tokenVerification = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) {
    return res.send("Missing Authorization Headers");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.auth = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token"});
  }
}

module.exports = tokenVerification