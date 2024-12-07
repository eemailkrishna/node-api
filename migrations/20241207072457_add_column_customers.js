/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.decimal('rate', 10, 2).nullable();
      table.decimal('discount', 10, 2).nullable();
      table.string('customer_type').nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('customers', (table) => {
      table.dropColumn('rate');
      table.dropColumn('discount');
      table.dropColumn('customer_type');
    });
  };

