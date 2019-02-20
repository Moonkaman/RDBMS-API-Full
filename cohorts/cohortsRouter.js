const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db('cohorts')
    .then(cohorts => res.status(200).json(cohorts))
    .catch(err => res.status(500).json({errorMessage: 'Could not retrieve list of cohorts at this time.', error: err}));
})

router.post('/', (req, res) => {
  if(req.body.name){
    db('cohorts').insert(req.body)
      .then(id => {
        db('cohorts').where({id: id[0]}).first()
          .then(newCohort => res.status(201).json(newCohort))
          .catch(err => res.status(500).json({errorMessage: 'Could not retrieve the new cohort at this time.', error: err}));
      })
      .catch(err => res.status(500).json({errorMessage: 'Could not create a new cohort at this time', error: err}));
  } else {
    res.status(400).json({errorMessage: 'Please provide a name with the request'});
  }
})

router.get('/:id', (req, res) => {
  db('cohorts').where({id: req.params.id}).first()
    .then(cohort => {
      if(cohort) {
        res.status(200).json(cohort);
      } else {
        res.status(404).json({errorMessage: 'The cohort with the specified id could not be found'});
      }
    })
})

module.exports = router;