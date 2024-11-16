/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('customers', (table) => {
      table.increments('id').primary();
      table.string('customer_name').notNullable();
      table.string('address').notNullable();
      table.string('mobile').notNullable();
      table.decimal('total_brick_amount', 10, 2).notNullable();
      table.decimal('total_paid_amount', 10, 2).notNullable();
      table.decimal('pending_amount', 10, 2).notNullable();
      table.integer('total_trolly').notNullable(); 
      table.integer('total_brick').notNullable(); 
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('customers');
  };