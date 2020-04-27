
exports.up = function(knex) {
  return knex.schema.createTable('users_to_courses', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id');
    table.integer('course_id').notNullable().references('courses.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_to_courses');
};
