const messageService = require("../services/messageService");
const chatService = require("../services/chatService");
const userService = require("../services/userService");

exports.sendMessage = async (req, res) => {
  try {
    const { chat_id, sender, message } = req.body;
    if (!chat_id) {
      return res.status(400).json({ message: "chat_id is required." });
    }
    if (!sender) {
      return res.status(400).json({ message: "sender is required." });
    }
    if (!message) {
      return res.status(400).json({ message: "message is required." });
    }
    if (sender != "user" && sender != "ai") {
      return res
        .status(400)
        .json({ message: "sender must be 'user' or 'ai'." });
    }

    const [chat] = await Promise.all([chatService.getChatById(chat_id)]);

    if (!chat || chat.length === 0) {
      return res.status(404).json({ message: "Chat not registered." });
    }

    const newMessage = await messageService.saveMessage(
      chat_id,
      sender,
      message
    );
    return res.status(201).json({
      message: "Message created successfully",
      data: { id: newMessage.insertId, chat_id, sender, message },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessagesById = async (req, res) => {
  try {
    const { messageId } = req.params;
    const messages = await messageService.getMessagesById(messageId);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getMessagesByChat(chatId);
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: "Messages not found" });
    }
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
