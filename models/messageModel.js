const db = require("../config/db");

const Message = {
  create: async (chat_id, sender, message) => {
    const [result] = await db.execute(
      `INSERT INTO messages (chat_id, sender, message) VALUES (?, ?, ?)`,
      [chat_id, sender, message]
    );
    return result;
  },
  getById: async (messageId) => {
    const [messages] = await db.execute(`SELECT * FROM messages WHERE id = ?`, [
      messageId,
    ]);
    return messages;
  },
  getByChat: async (messageId) => {
    const [messages] = await db.execute(
      `SELECT * FROM messages WHERE chat_id = ?`,
      [messageId]
    );
    return messages;
  },
  getAll: async () => {
    const [messages] = await db.execute(`SELECT * FROM messages`);
    return messages;
  },
};

module.exports = Message;
