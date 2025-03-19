/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  // await knex("chats").del();
  await knex("users").del();

  await knex("users").insert([
    {
      name: "Admin User",
      last_name: "",
      email: "admin@example.com",
      password: await bcrypt.hash("password", 10),
      role_id: 1,
      origin_id: 1,
      status: "active",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      name: "Regular User",
      last_name: "",
      email: "user@example.com",
      password: await bcrypt.hash("password", 10),
      role_id: 2,
      origin_id: 2,
      status: "active",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
};
