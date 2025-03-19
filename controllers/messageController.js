const messageService = require("../services/messageService");

exports.sendMessage = async (req, res) => {
  try {
    const { chat_id, sender, message } = req.body;
    if (!chat_id || !sender || !message) {
      return res
        .status(400)
        .json({ message: "chat_id, sender, and message are required." });
    }

    const newMessage = await messageService.sendMessage(
      chat_id,
      sender,
      message
    );
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getMessagesByChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await messageService.getMessagesByChat(chatId);
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
