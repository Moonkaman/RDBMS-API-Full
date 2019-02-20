const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve list of students at this time.', error: err}));
})

router.post('/', (req, res) => {
  if(req.body.name && req.body.cohort_id){
    db('students').insert(req.body)
      .then(id => {
        db('students').where({id: id[0]}).first()
          .then(newStudent => res.status(201).json(newStudent))
          .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the new student at this time.', error: err}));
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not create a new student at this time', error: err}));
  } else {
    res.status(400).json({errorMessage: 'Please provide a name and a valid cohort id with the request'});
  }
})

module.exports = router;