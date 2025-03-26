const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.route("/").get(messageController.getAllMessages);
router.route("/").post(messageController.sendMessage);

router.get("/chat/:chatId", messageController.getMessagesByChat);

router.get("/:messageId", messageController.getMessagesById);

module.exports = router;
