/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// migrations/20211109123056_create_users_table.js
exports.up = function(knex) {
    return knex.schema.createTable('tests', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.timestamps(true, true);  // created_at and updated_at
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
