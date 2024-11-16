/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('land_managements', (table) => {
      table.increments('id').primary();
      table.string('owner_name').notNullable();
      table.string('address').notNullable();
      table.string('mobile').notNullable();
      table.string('land_area').notNullable();
      table.string('total_price').notNullable();
      table.string('paid_amount').notNullable();
      table.string('pending_amount').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('land_managements');
  };
