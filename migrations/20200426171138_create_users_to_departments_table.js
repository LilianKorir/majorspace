
exports.up = function(knex) {
  return knex.schema.createTable('users_to_departments', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id');
    table.integer('department_id').notNullable().references('departments.id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_to_departments');
};
