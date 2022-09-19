const {User} = require("../database/models");

//get user
const getUser = async ({ email }) => {
  return await User.findOne({where: { email }, raw: true })
}

//get user
const getUserByName = async ({ fullName }) => {
  return await User.findOne({where: { fullName }, raw: true })
}

// create new user
const createNewUser = async ({
  fullName,
  email,
  password
}) => {

  const userExists = await User.findOne({where: { email }, raw: true });

  if(!userExists) {
    return await User.create({
      fullName,
      email,
      password
    });
  }
};

const updateUser = async ({ userId, fullName, email, password }) => {
  return await User.update(
    {
      fullName,
      email,
      password,
    },
    {
      where: {
        id: userId,
      },
      returning: true,
    }
  );
};

const userRepository = {
  getUser,
  getUserByName,
  createNewUser,
  updateUser
}

module.exports = userRepository;