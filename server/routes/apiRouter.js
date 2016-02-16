var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var db = require('../database');

router.route('/ab/:idInteraction')
  .get(function(req, res) {
    db.knex.raw(`select
                iteration_id,
                iteration_description,
                html_content,
                hits
                from ab_testing_iterations
                where interaction_id=${req.params.idInteraction}`)
      .then(function(result) {
        res.json(result[0]);
      });
  })
  .post(function(req, res) {
    
  });

router.route('/ab')
  .get(function(req,res) {
    db.knex.raw(`select interaction_id,
              iteration_id,
              iteration_description,
              html_content,
              hits
              from ab_testing_iterations`)
    .then(function(results) {
      res.json(results[0]);
    });
  });
  
module.exports = router;