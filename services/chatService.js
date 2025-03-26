const Chat = require("../models/chatModel");

const ChatService = {
  createChat: async (user_id, origin_id, topic) => {
    return await Chat.create(user_id, origin_id, topic);
  },

  getChatsByUser: async (user_id) => {
    return await Chat.getByUser(user_id);
  },
  getAllChats: async () => {
    return await Chat.getAll();
  },
  getChatById: async (chat_id) => {
    return await Chat.getById(chat_id);
  },
};

module.exports = ChatService;
