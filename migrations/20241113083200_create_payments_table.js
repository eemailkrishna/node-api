/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.integer('labour_id').unsigned().notNullable(); 
    table.string('work_date').notNullable();
    table.string('payment_amount').notNullable();
    table.string('status').notNullable();
    table.timestamps(true, true);
    table.foreign('labour_id').references('labour_id').inTable('labours').onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('payments');
};

