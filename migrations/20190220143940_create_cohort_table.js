
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(t) {
    t.increments();
    t.string('name').notNullable();
    t.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};
