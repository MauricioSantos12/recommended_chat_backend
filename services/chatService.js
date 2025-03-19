const Chat = require("../models/chatModel");

const ChatService = {
  createChat: async (user_id, origin_id) => {
    return await Chat.create(user_id, origin_id);
  },

  getChatsByUser: async (user_id) => {
    return await Chat.getByUser(user_id);
  },
};

module.exports = ChatService;
