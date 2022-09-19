const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authService = require('./auth.service');


const authController = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await authService({
    email
  })

  if (!userExists) return res.status(401).json({ message: "User not found!" });
  const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
  if (isPasswordCorrect) {
    const token = jwt.sign({
      id: userExists.id,
      fullName: userExists.fullName,
      email: userExists.email
    },
    process.env.JWT_SECRET_TOKEN, {
    expiresIn: '1d'
  });
    return res.json({ accessToken: token });
  } else {
    return res.status(401).json({ message: "Login failed" });
  }
}

module.exports = authController;