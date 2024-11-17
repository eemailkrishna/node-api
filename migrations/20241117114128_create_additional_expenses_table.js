/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('additional_expenses', (table) => {
      table.increments('id').primary();
      table.string('expense_name').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.string('date').notNullable();
      table.string('note').notNullable();
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('additional_expenses');
  };
