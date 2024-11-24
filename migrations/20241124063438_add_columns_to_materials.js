/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.table('material_purchases', (table) => {
      table.decimal('pending_amount', 10, 2).nullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table('material_purchases', (table) => {
      table.dropColumn('pending_amount');
    });
  };