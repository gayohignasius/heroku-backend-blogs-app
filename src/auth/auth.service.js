const userRepo = require("../user/user.repository");

const authServive = async ({ email }) => {
  return await userRepo.getUser({ email });
}

module.exports = authServive