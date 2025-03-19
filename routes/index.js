const express = require("express");

const chatRoutes = require("./chatRoutes");
const messagesRoutes = require("./messagesRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/chats", chatRoutes);
router.use("/messages", messagesRoutes);
router.use("/users", userRoutes);

module.exports = router;
