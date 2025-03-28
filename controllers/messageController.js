const messageService = require("../services/messageService");
const chatService = require("../services/chatService");
const userService = require("../services/userService");
const { responseMessageByIA } = require("../utils/useIA");

exports.sendMessage = async (req, res) => {
  try {
    const { chat_id, sender, message } = req.body;

    const missingField = !chat_id
      ? "chat_id"
      : !sender
      ? "sender"
      : !message
      ? "message"
      : null;
    if (missingField) {
      return res.status(400).json({ message: `${missingField} is required.` });
    }

    if (!["user", "ai"].includes(sender)) {
      return res
        .status(400)
        .json({ message: "sender must be 'user' or 'ai'." });
    }

    const chat = await chatService.getChatById(chat_id);
    if (!chat || chat.length === 0) {
      return res.status(404).json({ message: "Chat not registered." });
    }

    const chatHistory = await messageService.getMessagesByChat(chat_id);

    const answerIA = await responseMessageByIA({
      message,
      history: chatHistory,
    });
    if (
      !answerIA ||
      answerIA.includes("An error occurred while processing your request.")
    ) {
      console.error("AI Response Error:", answerIA);
      return res
        .status(500)
        .json({ message: "Failed to generate AI response." });
    }

    await messageService.saveMessage(chat_id, sender, message);
    const newIAMessage = await messageService.saveMessage(
      chat_id,
      "ai",
      answerIA
    );

    return res.status(201).json({
      message: "Message created successfully",
      data: {
        id: newIAMessage.insertId,
        chat_id,
        sender,
        message,
        responseMessageByIA: answerIA,
      },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
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
