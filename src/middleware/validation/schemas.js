const userRepository = require("../../user/user.repository");

const loginSchema = {
  email: {
    isString: true,
    isEmail: true,
    notEmpty: true,
    custom: {
      options: async (value) => {
        const user = await userRepository.getUser({
          email: value,
        });
        if (!user) {
          return Promise.reject("Email is not registered");
        }
      },
    },
  },
  password: {
    isString: true,
    notEmpty: true,
    errorMessage: "Password is required",
  },
};

const registrationSchema = {
  email: {
    isString: true,
    custom: {
      options: async (value) => {
        const user = await userRepository.getUser({
          email: value,
        });
        if (user) {
          return Promise.reject("Email address already taken");
        }
      },
    },
  },
  password: {
    isString: true,
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};

const updateUser = {
  fullName: {
    isString: true,
    notEmpty: true,
    errorMessage: "Full Name must not be empty",
  },
  email: {
    isString: true,
    notEmpty: true,
    errorMessage: "Email must not be empty",
  },
  password: {
    isString: true,
    notEmpty: true,
    errorMessage: "Password must not be empty",
  },
};

const createNewPost = {
  title: {
    isString: true,
    notEmpty: true,
    errorMessage: "Title must not be empty",
  },
  image: {
    isString: true,
    notEmpty: true,
    errorMessage: "Image must not be empty",
  },
  description: {
    isString: true,
    notEmpty: true,
    errorMessage: "Description must not be empty",
  },
};

const updatePost = {
  title: {
    isString: true,
    notEmpty: true,
    errorMessage: "Title must not be empty",
  },
  image: {
    isString: true,
    notEmpty: true,
    errorMessage: "Image must not be empty",
  },
  description: {
    isString: true,
    notEmpty: true,
    errorMessage: "Description must not be empty",
  },
};

const schemas = {
  loginSchema,
  registrationSchema,
  updateUser,
  createNewPost,
  updatePost,
};

module.exports = schemas;
