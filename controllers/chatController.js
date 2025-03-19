const chatService = require("../services/chatService");

exports.createChat = async (req, res) => {
  try {
    const { user_id, origin_id } = req.body;
    if (!user_id || !origin_id) {
      return res
        .status(400)
        .json({ message: "user_id and origin_id are required." });
    }

    const newChat = await chatService.createChat(user_id, origin_id);
    res.status(201).json(newChat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllChats = async (req, res) => {
  try {
    const chats = await chatService.getAllChats();
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await chatService.getChatById(id);
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
