const db = require("../config/db");

const Message = {
  create: async (chat_id, sender, message) => {
    const [result] = await db.execute(
      `INSERT INTO messages (chat_id, sender, message) VALUES (?, ?, ?)`,
      [chat_id, sender, message]
    );
    return result;
  },

  getByChat: async (chat_id) => {
    const [messages] = await db.execute(
      `SELECT * FROM messages WHERE chat_id = ?`,
      [chat_id]
    );
    return messages;
  },
};

module.exports = Message;
