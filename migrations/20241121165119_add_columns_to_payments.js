/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('payments', (table) => {
      table.date('payment_date').nullable(); 
      table.string('number_of_brick').nullable(); 
      table.decimal('advanced_amount', 10, 2).nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (table) => {
      table.dropColumn('payment_date');
      table.dropColumn('number_of_brick');
      table.dropColumn('advanced_amount');
    });
  };
  
