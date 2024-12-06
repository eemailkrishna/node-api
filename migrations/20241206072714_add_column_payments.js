/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('payments', (table) => {
      table.decimal('rate', 10, 2).nullable();

    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('payments', (table) => {
      table.dropColumn('rate');
    });
  };
