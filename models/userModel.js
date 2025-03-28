const db = require("../config/db");

const User = {
  create: async (user) => {
    const { email, name, last_name, role_id, origin_id } = user;
    const [result] = await db.execute(
      `INSERT INTO users (email, name, last_name, role_id, origin_id) VALUES (?, ?, ?, ?, ?)`,
      [email, name, last_name, role_id, origin_id]
    );
    return result;
  },

  getAll: async () => {
    const [users] = await db.execute(`SELECT * FROM users`);
    return users;
  },
  getUserById: async (user_id) => {
    const [user] = await db.execute(`SELECT * FROM users WHERE id = ?`, [
      user_id,
    ]);
    return user;
  },
};

module.exports = User;
