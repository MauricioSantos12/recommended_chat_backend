const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/", chatController.createChat);
router.get("/", chatController.getAllChats);

module.exports = router;
