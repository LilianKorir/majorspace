
exports.up = function(knex) {
  return knex.schema.createTable('departments', (table) => {
    table.increments('id');
    table.text('name');
    table.text('department_url');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('departments');
};
