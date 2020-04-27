
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.text('email').notNullable();
    table.text('password').notNullable();
    table.text('first_name').notNullable();
    table.text('last_name').notNullable();
    table.integer('class_year').notNullable();
    table.boolean('available_as_mentor').notNullable().defaultTo(0);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
