const db = require("../config/db");

const Chat = {
  create: async (user_id, origin_id) => {
    const [result] = await db.execute(
      `INSERT INTO chats (user_id, origin_id) VALUES (?, ?)`,
      [user_id, origin_id]
    );
    return result;
  },

  getByUser: async (user_id) => {
    const [chats] = await db.execute(`SELECT * FROM chats WHERE user_id = ?`, [
      user_id,
    ]);
    return chats;
  },
};

module.exports = Chat;
