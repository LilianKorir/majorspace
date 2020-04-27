
exports.up = function(knex) {
  return knex.schema.createTable('courses', (table) => {
    table.increments('id').primary();
    table.integer('department_id').notNullable().references('departments.id');
    table.text('course_number').notNullable();
    table.text('course_title').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('courses');
};
