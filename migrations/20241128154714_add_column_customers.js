/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.decimal('total_order_trolly', 10, 2).nullable();
      table.decimal('pending_trolly', 10, 2).nullable();

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.dropColumn('total_order_trolly');
      table.dropColumn('pending_trolly');
    });
  };