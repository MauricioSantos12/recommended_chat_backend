const User = require("../models/userModel");

const UserService = {
  getUserById: async (user_id) => {
    return await User.getUserById(user_id);
  },
};

module.exports = UserService;
