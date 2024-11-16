/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('additional_costs', (table) => {
      table.increments('cost_id').primary();
      table.string('description').notNullable();
      table.string('cost_amount').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('additional_costs');
  };