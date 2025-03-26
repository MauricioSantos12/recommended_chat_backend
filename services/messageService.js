const Message = require("../models/messageModel");

const MessageService = {
  saveMessage: async (chat_id, sender, message) => {
    return await Message.create(chat_id, sender, message);
  },
  getMessagesById: async (messageId) => {
    return await Message.getById(messageId);
  },

  getMessagesByChat: async (chatId) => {
    return await Message.getByChat(chatId);
  },
  getAllMessages: async () => {
    return await Message.getAll();
  },
};

module.exports = MessageService;
