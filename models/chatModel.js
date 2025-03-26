const db = require("../config/db");

const Chat = {
  create: async (user_id, origin_id, topic) => {
    const [result] = await db.execute(
      `INSERT INTO chats (user_id, origin_id, topic) VALUES (?, ?, ?)`,
      [user_id, origin_id, topic]
    );
    return result;
  },
  getById: async (chat_id) => {
    const [chats] = await db.execute(`SELECT * FROM chats WHERE id = ?`, [
      chat_id,
    ]);
    return chats;
  },
  getByUser: async (user_id) => {
    const [chats] = await db.execute(`SELECT * FROM chats WHERE user_id = ?`, [
      user_id,
    ]);
    return chats;
  },
  getAll: async () => {
    const [chats] = await db.execute(`SELECT * FROM chats`);
    return chats;
  },
};

module.exports = Chat;
