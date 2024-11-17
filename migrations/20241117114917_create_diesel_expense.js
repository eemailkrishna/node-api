/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('diesel_expenses', (table) => {
      table.increments('id').primary();
      table.string('diesel_qty').notNullable();
      table.decimal('price_per_ltr', 10, 2).notNullable();
      table.string('added_by').notNullable();
      table.date('expense_date').notNullable();
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('diesel_expenses');
  };
