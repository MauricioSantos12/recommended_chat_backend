const Message = require("../models/messageModel");

const MessageService = {
  saveMessage: async (chat_id, sender, message) => {
    return await Message.create(chat_id, sender, message);
  },

  getMessagesByChat: async (chat_id) => {
    return await Message.getByChat(chat_id);
  },
};

module.exports = MessageService;
