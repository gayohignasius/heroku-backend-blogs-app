const userRepo = require('./user.repository');
const bcrypt = require('bcrypt');
const saltRound = 10;

const createNewUser = async ({ fullName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return userRepo.createNewUser({
    fullName,
    email,
    password: hashedPassword,
  });
};

const editUser = async ({ userId, fullName, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return await userRepo.updateUser({
    userId,
    fullName,
    email,
    password: hashedPassword,
  });
};

const userService = {
  createNewUser,
  editUser
}

module.exports = userService;