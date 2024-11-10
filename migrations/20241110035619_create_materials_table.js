/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('material_purchases', (table) => {
      table.increments('purchase_id').primary();
      table.string('material_name').notNullable();
      table.integer('quantity').notNullable();
      table.string('supplier_name').notNullable();
      table.string('purchase_cost').notNullable();
      table.string('total_cost').notNullable();    
      table.timestamps(true, true);  
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
  };
