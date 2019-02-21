
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(t) {
    t.increments();
    t.string('name').notNullable();
    t.integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.timestamps(true, true);
  }) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};
