const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve list of cohorts at this time.', error: err}));
})

module.exports = router;