const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve list of students at this time.', error: err}));
})

module.exports = router;