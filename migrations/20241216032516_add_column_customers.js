/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.decimal('total_brick_order', 10, 2).nullable();

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.dropColumn('total_brick_order');

    });
  };
