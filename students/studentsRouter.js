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

router.get('/:id', (req, res) => {
  db.select('students.id', 'students.name as studentName', 'cohorts.name as cohort').from('students').innerJoin('cohorts', 'students.cohort_id', 'cohorts.id').where({'students.id': req.params.id})
    .then(student => {
      if(student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({errorMessage: 'The student with the specified id could not be found'});
      }
    })
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the student with the specified id at this time', error: err}));
})

router.put('/:id', (req, res) => {
  if(req.body.name && req.body.cohort_id) {
    db('students').where({id: req.params.id}).update(req.body)
      .then(count => {
        if(count > 0) {
          db('students').where({id: req.params.id}).first()
            .then(student => res.status(200).json(student))
            .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the updated student at this time', error: err}));
        } else {
          res.status(404).json({errorMessage: 'Student with the specified id not found.'})
        }
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not update the student with the specified id', error: err}));
  } else {
    res.status(400).json({errorMessage: 'Please provide a name and a valid cohort id with the request'});
  }
})

router.delete('/:id', (req, res) => {
  db('students').where({id: req.params.id}).del()
    .then(count => {
      if(count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({errorMessage: 'Student with the specified id not found.'})
      }
    })
})

module.exports = router;