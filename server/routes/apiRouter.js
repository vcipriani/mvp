var express = require('express');
var router = express.Router();
var Promise = require('bluebird');

var Interaction = require('../models/Interaction');

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
 
router.route('/interactions')
  .get(function(req, res) {
    Interaction.getAllInteractions()
      .then(function(results) {
        res.json(results);
      });
  });
 
router.route('/interactions/active')
  .get(function(req,res) {
    Interaction.getActiveInteractions()
      .then(function(results) {
        res.json(results);
      });
  })
  .post(function(req, res) {
    Interaction.addInteractionToPage(req.body.pageId, req.body.interactionId, req.body.targetSelector)
      .then(function(result) {
        res.json(result);
      });
  });

router.route('/interactions/active/:id')
  .delete(function(req, res) {
    Interaction.removeInteractionFromPage(req.params.id)
      .then(function(result) {
        res.send('success');
      });
  });

module.exports = router;