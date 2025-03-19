/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("name").notNullable();
    table.string("last_name").notNullable();
    table.integer("role_id").unsigned().notNullable();
    table.integer("origin_id").unsigned().notNullable();
    table.enu("status", ["active", "inactive"]).defaultTo("active");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
    table.foreign("role_id").references("roles.id").onDelete("CASCADE");
    table.foreign("origin_id").references("origins.id").onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
