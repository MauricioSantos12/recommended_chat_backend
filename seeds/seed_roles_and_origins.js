/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("roles").del();
  await knex("origins").del();

  await knex("roles").insert([
    { id: 1, name: "Admin", created_at: knex.fn.now() },
    { id: 2, name: "User", created_at: knex.fn.now() },
  ]);

  await knex("origins").insert([
    { id: 1, name: "Web", created_at: knex.fn.now() },
    { id: 2, name: "WhatsApp", created_at: knex.fn.now() },
  ]);
};
