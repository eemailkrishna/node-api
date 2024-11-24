/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.decimal('advance_amount', 10, 2).nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.dropColumn('advance_amount');
    });
  };