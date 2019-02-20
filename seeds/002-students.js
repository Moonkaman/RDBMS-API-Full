
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Nick', cohort_id: 2},
        {name: 'Orlando', cohort_id: 2},
        {name: 'Nathan', cohort_id: 2},
        {name: 'Johnathan', cohort_id: 1},
        {name: 'Alexander', cohort_id: 1},
        {name: 'Omar', cohort_id: 1},
        {name: 'Wesley', cohort_id: 3}
      ]);
    });
};
