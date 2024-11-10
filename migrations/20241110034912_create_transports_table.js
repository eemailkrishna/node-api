/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transports', (table) => {
      table.increments('transport_id').primary();
      table.string('name').notNullable();
      table.string('phone').unique().notNullable();
      table.string('address').unique().notNullable();
      table.string('transport_detail').notNullable();
      table.string('payment_amount').notNullable();
      table.string('pending_amount').notNullable();     
      table.timestamps(true, true);  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
