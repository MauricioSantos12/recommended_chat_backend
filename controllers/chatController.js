const chatService = require("../services/chatService");
const userService = require("../services/userService");
const originService = require("../services/originService");

exports.createChat = async (req, res) => {
  try {
    const { user_id, origin_id, topic } = req.body;

    // Validate required fields
    if (!user_id || !origin_id) {
      return res
        .status(400)
        .json({ message: "user_id and origin_id are required." });
    }
    if (!topic) {
      return res.status(400).json({ message: "topic is required." });
    }

    // Validate user and origin existence
    const [user, origin] = await Promise.all([
      userService.getUserById(user_id),
      originService.getOriginById(origin_id),
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User not registered." });
    }

    if (!origin || origin.length === 0) {
      return res.status(404).json({ message: "Origin not registered." });
    }

    // Create new chat
    const chat = await chatService.createChat(user_id, origin_id, topic);

    return res.status(201).json({
      message: "Chat created successfully",
      data: { id: chat.insertId, user_id, origin_id, topic },
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ message: "Internal server error" });
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
    const { chatId } = req.params;
    const chat = await chatService.getChatById(chatId);
    if (!chat || chat.length === 0) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (error) {
    console.error("Error fetching chat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
