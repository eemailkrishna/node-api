/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// migrations/20211109123056_create_users_table.js
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone').unique().notNullable();
      table.string('address').unique().notNullable();
      table
      .enum('user_type', ['labour', 'transporter'])
      .notNullable();
      table
      .enum('role', ['admin', 'manager', 'user'])
      .notNullable();
      table.timestamps(true, true);  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  
