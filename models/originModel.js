const db = require("../config/db");

const Origin = {
  getAll: async () => {
    const [origins] = await db.execute(`SELECT * FROM origins`);
    return origins;
  },
  getOriginById: async (origin_id) => {
    const [origin] = await db.execute(`SELECT * FROM origins WHERE id = ?`, [
      origin_id,
    ]);
    return origin;
  },
};

module.exports = Origin;
