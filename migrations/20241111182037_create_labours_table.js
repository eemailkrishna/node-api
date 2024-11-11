/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('labours', (table) => {
      table.increments('labour_id').primary();
      table.string('name').notNullable();
      table.string('mobile').notNullable();
      table.string('address').notNullable();
      table.string('type').notNullable();   
      table.timestamps(true, true);  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('labours');
  };
