
exports.up = function(knex) {
  return knex.schema.createTable('faculty_to_departments', (table) => {
    table.increments('id').primary();
    table.integer('faculty_id').notNullable().references('faculty.id');
    table.integer('department_id').notNullable().references('departments.id');
    table.unique(['faculty_id', 'department_id']);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('faculty_to_departments')
};
