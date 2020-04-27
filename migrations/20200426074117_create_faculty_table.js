
exports.up = function(knex) {
  return knex.schema.createTable('faculty', (table) => {
    table.increments('id').primary();
    table.text('name').notNullable();
    table.text('titles');
    table.specificType('expertise_areas', 'text ARRAY');
    table.text('email');
    table.text('phone');
    table.text('office');
    table.text('image_url');
    table.text('profile_url');
    table.unique('name');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('faculty');
};
