/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("chats", function (table) {
    table.string("topic").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("chats", function (table) {
    table.dropColumn("topic");
  });
};
