
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {colName: 'Nick', cohort_id: 2},
        {colName: 'Orlando', cohort_id: 2},
        {colName: 'Nathan', cohort_id: 2},
        {colName: 'Johnathan', cohort_id: 1},
        {colName: 'Alexander', cohort_id: 1},
        {colName: 'Omar', cohort_id: 1},
        {colName: 'Wesley', cohort_id: 3}
      ]);
    });
};
