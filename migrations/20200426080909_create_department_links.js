
exports.up = function(knex) {
  return knex.schema.createTable('department_links', (table) => {
    table.increments('id').primary();
    table.integer('department_id').references('departments.id');
    table.text('label').notNullable();
    table.text('url').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('department_links');
};
