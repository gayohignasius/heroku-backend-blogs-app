const userService = require("./user.service");

const createNewUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const newUser = await userService.createNewUser({
      fullName,
      email,
      password,
    });
    res.status(200).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const editUser = async (req, res) => {
  const { userId } = req.params;
  const { fullName, email, password } = req.body;
  try {
    const updatedUser = await userService.editUser({
      userId,
      fullName,
      email,
      password,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error!" });
  }
};

const userController = {
  createNewUser,
  editUser
}

module.exports = userController