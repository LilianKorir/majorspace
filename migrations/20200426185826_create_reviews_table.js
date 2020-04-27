
exports.up = function(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('users.id');
    table.integer('course_id').references('courses.id');
    table.integer('department_id').references('departments.id');
    table.integer('faculty_id').references('faculty.id');
    table.text('description');
    table.text('review').notNullable();
    table.integer('rating').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
